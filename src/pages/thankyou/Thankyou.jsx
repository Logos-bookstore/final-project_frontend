import { useContext } from "react";
import { Context } from "../../context/Context";
import './thankyou.css'

export default function Thankyou() {
    const {orderReceived} = useContext(Context);
    return (
        <div className="thankyou-container">
            <p className="thankyou-msg">{orderReceived}</p>
        </div>
    );
};