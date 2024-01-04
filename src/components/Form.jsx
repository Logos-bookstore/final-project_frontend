import { useContext } from "react";
import { Context } from "../context/Context";
import Continue from "./Continue";

export default function Form({children, update}) {
    const {user, setUser} = useContext(Context);
    const updateUser = async (e) => {
        e.preventDefault();
        try {
            const token = sessionStorage.getItem("token");
            if(token) {
                let data = {};
                if(e.target?.firstName?.value) {
                    data = {firstName: e.target.firstName.value};
                } else if(e.target?.lastName?.value) {
                    data = {lastName: e.target.lastName.value};
                } else if(e.target?.email?.value) {
                    data = {email: e.target.email.value};
                } else if(e.target?.password?.value && e.target?.reEnter?.value) {
                    data = {password: e.target.password.value};
                } else {};
                const response = await fetch(`${import.meta.env.VITE_USER_UPDATE}${user._id}`, {method: "PATCH", headers: {"Content-Type": "application/json", token: token}, body: JSON.stringify(data)});
                if(response.ok) {
                    const newData = await response.json();
                    if(newData.success) {
                        setUser(newData.data);
                    }
                }
            }
        } catch (error) {
            //
        };
    };
    return (
        <>
            <form onSubmit={updateUser}>
                <fieldset>
                    <legend>{update}</legend>
                    {children}
                    <Continue/>
                </fieldset>
            </form>
        </>
    );
};