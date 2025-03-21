import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useRef } from "react";
import axios from "axios";

export const useCardSwipe = () => {
  const currentEvent = useSelector(
    (state: RootState) => state.events.currentEvent
  );
  const eventId = currentEvent?.eventId;
  const momocoins = currentEvent?.momocoins;

  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const buffer = useRef(""); // Swiped card data is appended here

  const sendCardSwipe = async (cardSwipeData: string) => {
    const API_URL = `http://localhost:3000/api/event/checkin/${eventId}`;
    try {
      const response = await axios.post(API_URL, { cardSwipeData, momocoins });
      console.log(response.data?.checkin);
      // add new checkin to redux store slice
    } catch (error) {
      console.error("Error sending card swipe data:", error);
    }
  };

  const handleCardSwipe = (event: KeyboardEvent) => {
    buffer.current += event.key;
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      console.log(`Captured: ${buffer.current}`);
      sendCardSwipe(buffer.current);
      buffer.current = "";
    }, 500);
  };

  return { handleCardSwipe };
};
