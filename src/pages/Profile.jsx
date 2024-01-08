import { useContext } from "react";
import { Context } from "../context/Context";
import FirstName from "../components/FirstName";
import LastName from "../components/LastName";
import Image from "../components/Image";
import Upload from "../components/Upload";
import Form from "../components/Form";
import Email from "../components/Email";
import Password from "../components/Password";
import ReEnter from "../components/ReEnter";

export default function Profile() {
    const {user} = useContext(Context);
    async function uploadBook(e) {
        e.preventDefault();
        try {
            const book = new FormData(e.target);
            const token = sessionStorage.getItem("token");
            if(token) {
                const response = await fetch(`${import.meta.env.VITE_UPLOAD_BOOK}`, {method: "POST", headers: {token: token}, body: book});
                if(response.ok) {
                    const data = await response.json();
                    if(data.success) {
                        console.log(data.message);
                    };
                };
            };
        } catch (error) {
            //
        };
    };
    return (
        <>
            {user?.image?.thumbnail && <img src={user?.image?.thumbnail} alt="" />}
            <h2>{user?.firstName}</h2>
            <div>
                <Form update="Upload a Profile Image">
                    <Image/>
                </Form>
                <Form update="Update Your First Name">
                    <FirstName/>
                </Form>
                <Form update="Update Your Last Name">
                    <LastName/>
                </Form>
                <Form update="Update Your Email">
                    <Email/>
                </Form>
                <Form update="Update Your Password">
                    <Password/>
                    <ReEnter/>
                </Form>
            </div>
            <div>
                {
                    user?.role === "admin"
                    &&
                    <form onSubmit={uploadBook}>
                        <fieldset>
                            <legend>Upload a Book</legend>
                            <div>
                                <label htmlFor="title">Title</label>
                                <input type="text" name="title" id="title" />
                            </div>
                            <FirstName/>
                            <LastName/>
                            <div>
                                <label htmlFor="year">Year</label>
                                <input type="number" name="year" id="year" />
                            </div>
                            <div>
                                <label htmlFor="publisher">Publisher</label>
                                <input type="text" name="publisher" id="publisher" />
                            </div>
                            <div>
                                <label htmlFor="genre">Genre</label>
                                <input type="text" name="genre" id="genre" />
                            </div>
                            <div>
                                <label htmlFor="description">Description</label>
                                <textarea name="description" id="description" cols="30" rows="10"></textarea>
                            </div>
                            <div>
                                <label htmlFor="price">Price</label>
                                <input type="number" step="any" name="price" id="price" />
                            </div>
                            <div>
                                <label htmlFor="isbn">ISBN</label>
                                <input type="text" name="isbn" id="isbn" />
                            </div>
                            <Image/>
                            <Upload/>
                        </fieldset>
                    </form>
                }
            </div>
        </>
    );
};