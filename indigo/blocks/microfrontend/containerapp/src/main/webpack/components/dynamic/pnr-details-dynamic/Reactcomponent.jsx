import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import { events } from "../../../utils/custom-events";

const ReactCompoent = (props) => {
    const { mfData} = props;
    const [data, setMfData] = useState({});
    const [bookingData, setBookingData] = useState({});

    useEffect(() => {   
        if(mfData) {
            const data = JSON.parse(mfData);
            setMfData(data);
        }
    },[mfData]);

    useEffect(()=> {
        document.addEventListener(events.CHANGE_FLIGHT_CUSTOM_EVENT, (event) => {
          if(event?.detail) {
            setBookingData(event?.detail?.bookingDetails);
          }
          });
    }, []);

    const { pnrbookingRef = "", dateOfBooking = ""} = data;
    const { recordLocator = "", utcBookedDate = "" } = bookingData;
    return recordLocator && utcBookedDate ? (
        <div className="pnr-details-dynamic">
            <span className="pnr">{`${pnrbookingRef} ${recordLocator}`}</span>
            <spna className="booking-date">{`${dateOfBooking} ${utcBookedDate}`}</spna>
        </div>
    ) : null;
};

ReactCompoent.propTypes = {
    mfData: PropTypes.string,
};

export default ReactCompoent;
