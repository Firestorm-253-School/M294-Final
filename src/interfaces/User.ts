import { ApiGet } from "../components/api";

export default interface User {
	id: number;
	username: string;
	email: string;
	created_at: Date;
	updated_at: Date;
}

export async function GetUserById(user_id: number)
{
	return await ApiGet("users/" + user_id)
}