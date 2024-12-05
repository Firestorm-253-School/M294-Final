import { useEffect, useState } from "react";

import User from "../../interfaces/User";
import { ApiGet } from "../../components/api";

export interface IOverwiePageProps {}

const OverwiePage: React.FC<IOverwiePageProps> = (props) => {
	const [users, setUsers] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			const users = await ApiGet("users");
			setUsers(users);
			setIsLoading(false);
		};
		fetchData();
	}, []);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (users.length === 0) {
		return (
			<div>
				<h1>No users not found</h1>
			</div>
		);
	}

	return (
		<>
			<div>
				<h1>User List</h1>
				<div>
					{users.map((entry: User) => (
						<div>
							<h3>{entry.username}</h3>
							<p>{entry.email}</p>
							<br/>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default OverwiePage;
