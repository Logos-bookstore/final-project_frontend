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
                let data;
                if(e.target?.firstName?.value) {
                    data = {
                        method: "PATCH",
                        headers: {"Content-Type": "application/json", token: token},
                        body: JSON.stringify({firstName: e.target.firstName.value})
                    };
                } else if(e.target?.lastName?.value) {
                    data = {
                        method: "PATCH",
                        headers: {"Content-Type": "application/json", token: token},
                        body: JSON.stringify({lastName: e.target.lastName.value})
                    };
                } else if(e.target?.email?.value) {
                    data = {
                        method: "PATCH",
                        headers: {"Content-Type": "application/json", token: token},
                        body: JSON.stringify({email: e.target.email.value})
                    };
                } else if(e.target?.password?.value && e.target?.reEnter?.value) {
                    data = {
                        method: "PATCH",
                        headers: {"Content-Type": "application/json", token: token},
                        body: JSON.stringify({password: e.target.password.value})
                    };
                } else if(e.target?.image?.value) {
                    data = {
                        method: "PATCH",
                        headers: {token: token},
                        body: new FormData(e.target)
                    };
                } else if(e.target.street.value && e.target.zip.value && e.target.city.value && e.target.country.value) {
                    let address = {
                        street: e.target.street.value,
                        zip: e.target.zip.value,
                        city: e.target.city.value,
                        country: e.target.country.value
                    };
                    console.log(address)
                    data = {
                        method: "PATCH",
                        headers: {"Content-Type": "application/json", token: token},
                        body: JSON.stringify({address: address})
                    };
                };
                const response = await fetch(`${import.meta.env.VITE_USER_UPDATE}${user._id}`, data);
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
            <div>
                <form onSubmit={updateUser}>
                    <fieldset>
                        <legend>{update}</legend>
                        {children}
                        <Continue/>
                    </fieldset>
                </form>
            </div>
        </>
    );
};