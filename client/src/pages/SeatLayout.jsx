
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { dummyShowsData, dummyDateTimeData } from '../assets/assets';
import { useEffect } from 'react';
import Loading from '../components/Loading';
import {ArrowRightIcon, Clock} from 'lucide-react'; 
import ISOTimeFormat from '../lib/ISOTimeFormat';
import BlurCircle from '../components/BlurCircle';
import {assets} from '../assets/assets';
import { toast } from 'react-hot-toast';


const SeatLayout = () => {

  const groupRows=[["A","B"],["C","D"],["E","F"],["G","H"],["I","J"]];

  const {id,date}=useParams();

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [show, setShow] = useState(null);

  const navigate=useNavigate();

  const getShow = async () => {
    const show = dummyShowsData.find((show) => show._id === id);
    if (show) {
      setShow({
        movie: show,
        dateTime: dummyDateTimeData
      });
    }
  }

  const handleSeatClick=(seatId)=>{
    if(!selectedTime){
      return toast("Please select a time First");
    }
    if(!selectedSeats.includes(seatId) &&  selectedSeats.length>4){
      return toast ("You can only select up to 5 seats");
    }
    setSelectedSeats(prev=>prev.includes(seatId)?prev.filter((id)=>id!==seatId):[...prev,seatId]);
  }

  const renderSeats =(row,count=9)=>(
    <div key={row} className='flex gap-2 mt-2'>
      <div className='flex flex-wrap items-center justify-center gap-2'>
      {
        Array.from({length:count},(_,i)=>{
          const seatId = `${row}${i+1}`;
          return (
            <button key={seatId} onClick={()=>handleSeatClick(seatId)} className={`h-8 w-8 rounded border border-primary/60 cursor-pointer ${selectedSeats.includes(seatId) && "bg-primary-dull text-white"}`}>
              {seatId}
            </button>
          )
        })
      }
    </div>
    </div>
  )

  useEffect(() => {
    getShow();
  }, []);

  return show ?  (
    // dispaly two component left side show details and right side seat layout
    <div className='flex  flex-col md:flex-row px-6 md:px-16 lg:px-40 py-32 md:pt-50'>

      {/* available timings */}
      <div className='w-60 bg-primary/30 border border-primary/70 rounded-lg py-10 h-max md:sticky md:top-30'>
      <p className='text-lg font-semibold px-6'> Available Timings</p>
      <div className='mt-5 space-y-1'>
        {show.dateTime[date].map((item)=>(
          <div key={item.time} onClick={()=>setSelectedTime(item)}  className={`flex items-center gap-2 px-6 py-3 w-max rounded-r-md cursor-pointer transition ${selectedTime?.time===item.time ? 'bg-primary-dull text-white' : ''}`}>
            <Clock className='w-4.5 h-4.5'/>
            <p className='text-sm'>{ISOTimeFormat(item.time) }</p>
          </div>
        ))}
      </div>

      </div>

      {/* seat layout */}
      <div className='relative flex-1  flex flex-col items-center max-md:mt-16'>
        <BlurCircle top='-100px' left='-100px'/>
        <BlurCircle bottom='0' right='0'/>
        <h1 className='text-2xl font-semibold mb-4'>Select Your Seats</h1>
        <img src={assets.screenImage} alt="screen" />
        <p className='text-gray-400 text-sm mb-6'>SCREEN SIDE</p>

        <div className='flex flex-col items-center mt-10 text-xs text-gray-300'>
          <div className='grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-2 mb-6'>
            {
              groupRows[0].map(row => renderSeats(row))
            }
          </div>

            <div className='grid grid-cols-2 gap-11'>
            {groupRows.slice(1).map((group,idx)=>(
              <div key={idx}>
                {group.map(row => renderSeats(row))}
              </div>
            ))}
        </div>

        </div>

        
            <button 
            onClick={()=>navigate('/my-bookings')}
            className='flex items-center gap-1 px-10 py-3 mt-20 text-sm bg-primary-dull hover:bg-primary-dull transition rounded-full font-medium cursor-pointer active:scale-95'>
              Proceed To Checkout
              <ArrowRightIcon strokeWidth={3} className='w-4.5 h-4.5'/>
            </button>

      </div>

    </div>
    
  )
  :
  (
    <Loading />
  )
}

export default SeatLayout