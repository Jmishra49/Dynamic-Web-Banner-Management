import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

// Styled components with responsive design
const BannerWrapper = styled.div`
  text-align: center;
  color: white;
  background-color: #1e1e1e;
  position: relative;
  padding: 0;
  width: 100%;
  overflow: hidden;
`;

const BannerImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

const Timer = styled.div`
  position: absolute;
  top: 60%; /* Move this value to adjust vertical positioning */
  left: 50%; /* Center horizontally */
  transform: translateX(-50%); /* Center horizontally */
  background: rone;
  color: transparent;
  padding: 1vw; /* Reduced padding */
  border-radius: 0.5vw; /* Reduced border radius */
  // box-shadow: 0 0.5vw 1vw rgba(0, 0, 0, 0.3);
  font-size: 1vw; /* Reduced font size */
`;

const Description = styled.h1`
  margin: 1.5vw 0;
  font-size: 1.5vw; /* Adjusted font size */
`;

const CountdownWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5vw; /* Reduced gap */
  margin-top: 1vw;
`;

const TimeBox = styled.div`
  background-color: #222a3a;
  padding: 1.5vw; /* Reduced padding */
  border-radius: 0.5vw; /* Reduced border radius */
  box-shadow: 0 0.5vw 1vw rgba(0, 0, 0, 0.2);
`;

const TimeBoxSpan = styled.span`
  display: block;
  font-size: 2vw; /* Reduced font size */
  font-weight: bold;
  color: #ffffff;
`;

const TimeBoxSmall = styled.small`
  display: block;
  margin-top: 0.2vw; /* Reduced margin */
  font-size: 0.5vw; /* Reduced font size */
  color: #aaaaaa;
  text-transform: uppercase;
`;

function Banner() {
  const [banner, setBanner] = useState({});
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isVisible, setIsVisible] = useState(true); // State to control banner visibility

  useEffect(() => {
    axios.get("http://localhost:5000/api/banner").then((res) => {
      setBanner(res.data);
      calculateTimeLeft(res.data.timer);
    });

    const timerInterval = setInterval(() => {
      if (banner.timer) {
        calculateTimeLeft(banner.timer);
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [banner]);

  const calculateTimeLeft = (endTime) => {
    const difference = new Date(endTime) - new Date();
    if (difference <= 0) {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      setIsVisible(false); // Hide the banner when the timer is up
      return;
    }
    setTimeLeft({
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    });
  };

  if (!isVisible || !banner.visibility) {
    return null;
  }

  return (
    <BannerWrapper>
      {banner.link && <BannerImage src={banner.link} alt="Banner Image" />}
      <Timer>
        <CountdownWrapper>
          <TimeBox>
            <TimeBoxSpan>{timeLeft.days}</TimeBoxSpan>
            <TimeBoxSmall>Days</TimeBoxSmall>
          </TimeBox>
          <TimeBox>
            <TimeBoxSpan>{timeLeft.hours}</TimeBoxSpan>
            <TimeBoxSmall>Hours</TimeBoxSmall>
          </TimeBox>
          <TimeBox>
            <TimeBoxSpan>{timeLeft.minutes}</TimeBoxSpan>
            <TimeBoxSmall>Minutes</TimeBoxSmall>
          </TimeBox>
          <TimeBox>
            <TimeBoxSpan>{timeLeft.seconds}</TimeBoxSpan>
            <TimeBoxSmall>Seconds</TimeBoxSmall>
          </TimeBox>
        </CountdownWrapper>
      </Timer>
      <Description>{banner.description}</Description>
    </BannerWrapper>
  );
}

export default Banner;
