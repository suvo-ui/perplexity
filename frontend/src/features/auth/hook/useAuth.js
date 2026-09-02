import { useDispatch } from "react-redux";
import { setUser, setLoading, setError } from "../auth.slice.js";
import { register, login, getMe } from "../services/auth.api.js";

export function useAuth() {
  const dispatch = useDispatch();

  async function handleRegister({ username, email, password }) {
    dispatch(setLoading(true));
    try {
      const data = await register({ username, email, password });
      dispatch(setUser(data.user));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleLogin({ email, password }) {
    dispatch(setLoading(true));
    try {
      const data = await login({ email, password });
      dispatch(setUser(data.user));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function fetchCurrentUser() {
    dispatch(setLoading(true));
    try {
      const data = await getMe();
      dispatch(setUser(data.user));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  }

  return { handleRegister, handleLogin, fetchCurrentUser };
}
