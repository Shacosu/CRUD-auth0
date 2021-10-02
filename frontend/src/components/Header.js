import React from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	height: 60px;
	background-color: #000;
	padding: 0 20px;
`;
const Brand = styled.div`
	color: white;
	font-size: 20px;
	font-weight: 600;
	margin-left: 20px;
	text-transform: uppercase;
	font-family: "Times New Roman", Times, serif;
`;

const Button = styled.button`
	border: none;
	padding: 10px;
	font-size: 12px;
	color: black;
	background-color: white;
	font-weight: bold;
	text-transform: uppercase;
	cursor: pointer;
	&:hover {
		background-color: #f2f2f2;
	}
`;

const RightInfo = styled.h3`
	color: white;
	display: flex;
	align-items: center;
	width: 220px;
	font-size: 18px;
	justify-content: space-around;
`;

const Img = styled.img`
	border-radius: 50%;
	object-fit: cover;
`;

export default function Header() {
	const { loginWithRedirect, user, isAuthenticated, logout } = useAuth0();
	return (
		<Container>
			<Brand>Simple Login Auth0</Brand>
			{isAuthenticated ? (
				<>
					<RightInfo>
						<Img src={`${user.picture}`} alt={user.name} width="32px" />
						{user.nickname}
						<Button onClick={() => logout()}>Logout</Button>
					</RightInfo>
				</>
			) : (
				<Button onClick={() => loginWithRedirect()}>Login</Button>
			)}
		</Container>
	);
}
