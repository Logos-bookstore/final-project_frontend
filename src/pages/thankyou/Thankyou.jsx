import { useContext } from "react";
import { Context } from "../../context/Context";

export default function Thankyou() {
    const {orderReceived} = useContext(Context);
    return (
        <>
            <p className="thankyou-msg">{orderReceived}</p>
        </>
    );
};