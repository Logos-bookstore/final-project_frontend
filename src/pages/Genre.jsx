import { useLocation } from "react-router-dom";

export default function Genre() {
    const {state} = useLocation();
    return (
        <>
            <h4>Genre</h4>
            <h5>{state}</h5>
        </>
    );
};