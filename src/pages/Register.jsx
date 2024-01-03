import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Continue from "../components/Continue";
import Email from "../components/Email";
import FirstName from "../components/FirstName";
import LastName from "../components/LastName";
import Password from "../components/Password";
import ReEnter from "../components/ReEnter";
import { Context } from "../context/Context";

export default function Register() {
    const {setUser} = useContext(Context);
    const navigate = useNavigate();
    async function register(e) {
        e.preventDefault();
        if(e.target.password.value === e.target.reEnter.value) {
            const user = {
                firstName: e.target.firstName.value,
                lastName: e.target.lastName.value,
                email: e.target.email.value,
                password: e.target.password.value,
            };
            try {
                const response = await fetch(`${import.meta.env.VITE_REGISTER}`, {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(user)});
                if(response.ok) {
                    const token = response.headers.get("token");
                    if(token) {
                        sessionStorage.setItem("token", token);
                        const data = await response.json();
                        if(data.success) {
                            setUser(data.data);
                            navigate("/profile");
                        };
                    };
                };
            } catch (error) {
                //
            };
        } else {
            //
        };
    };
    return (
        <>
            <form onSubmit={register}>
                <FirstName/>
                <LastName/>
                <Email/>
                <Password/>
                <ReEnter/>
                <Continue/>
            </form>
        </>
    );
};