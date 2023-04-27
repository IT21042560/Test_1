import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const Signup = () => {
	const [data, setData] = useState({
		Seller_Id:"",
		FirstName: "",
		LastName: "",
		Email: "",
		Contact_no:"",
		Hash_password: "",
		ProfilePicture:"",
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8050/seller/Signup";
			const { data: res } = await axios.post(url, data);
			navigate("/login");
			console.log(res.message);
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	return (
		<div className={styles.signup_container}>
			<div className={styles.signup_form_container}>
				<div className={styles.left}>
					<h1>Welcome Back</h1>
					<Link to="/login">
						<button type="button" className={styles.white_btn}>
							Sing in
						</button>
					</Link>
				</div>
				<div className={styles.right}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Create Account</h1>
						<input
							type="text"
							placeholder="First Name"
							name="FirstName"
							onChange={handleChange}
							value={data.FirstName}
							required
							className={styles.input}
						/>
						<input
							type="text"
							placeholder="Last Name"
							name="LastName"
							onChange={handleChange}
							value={data.LastName}
							required
							className={styles.input}
						/>
						<input
							type="email"
							placeholder="Email"
							name="Email"
							onChange={handleChange}
							value={data.Email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="Hash_password"
							onChange={handleChange}
							value={data.Hash_password}
							required
							className={styles.input}
						/>
						<input
							type="text"
							placeholder="Contact Number"
							name="Contact_no"
							onChange={handleChange}
							value={data.Contact_no}
							required
							className={styles.input}
						/>
						
						<input
							type="file"
							placeholder="image"
							name="ProfilePicture"
							onChange={handleChange}
							value={data.ProfilePicture}
							
							className={styles.input}
						/>
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.green_btn}>
							Sing Up
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Signup;