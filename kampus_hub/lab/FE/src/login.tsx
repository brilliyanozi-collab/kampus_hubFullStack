import { useState, type FormEvent } from "react";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrorMessage("");

        if (!username.trim() || !password.trim()) {
            setErrorMessage("Username dan password tidak boleh kosong.");
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username.trim(),
                    password: password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                // Backend app.js mengembalikan properti { massage: "login berhasil" } atau { massage: "login gagal" }
                const message = data.massage || data.message;

                if (message === "login berhasil") {
                    setIsLoggedIn(true);
                    setLoggedInUser(username.trim());
                } else {
                    setErrorMessage(message || "Login gagal. Username atau password salah.");
                }
            } else {
                setErrorMessage("Terjadi kesalahan pada server saat proses login.");
            }
        } catch {
            // Fallback jika backend belum aktif agar tetap dapat diuji
            const defaultUsers = [
                "muhammad brilliyan ghoutsi",
                "muhammad anggoro wijaya",
                "arjun king wali it",
                "arif asisten wali",
            ];

            if (
                defaultUsers.includes(username.trim().toLowerCase()) &&
                password === "717717"
            ) {
                setIsLoggedIn(true);
                setLoggedInUser(username.trim());
            } else {
                setErrorMessage(
                    "Gagal terhubung ke backend (http://localhost:3000/login). Pastikan server backend aktif atau periksa username & password."
                );
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        // Reset status login dan kosongkan kembali form login
        setIsLoggedIn(false);
        setLoggedInUser("");
        setUsername("");
        setPassword("");
        setErrorMessage("");
    };

    return (
        <main className="login-page">
            <section className="login-heading">
                <p className="login-eyebrow">AUTENTIKASI SISTEM</p>
                <h1>{isLoggedIn ? "Dashboard Pengguna" : "Halaman Login"}</h1>
                <p>
                    {isLoggedIn
                        ? "Anda berhasil masuk ke sistem KampusHub Universitas Wahidiyah."
                        : "Silakan masukkan username dan password akun Anda."}
                </p>
            </section>

            {isLoggedIn ? (
                // Tampilan setelah login berhasil: muncul pesan dan tombol Log Out
                <div className="login-card login-success-card">
                    <div className="login-success-badge">✓ Login Berhasil</div>
                    <h2>Selamat Datang, {loggedInUser}!</h2>
                    <p className="login-desc">
                        Status akun Anda saat ini aktif. Klik tombol di bawah ini jika ingin keluar dari sesi.
                    </p>
                    <button
                        type="button"
                        className="logout-button"
                        onClick={handleLogout}
                    >
                        Log Out
                    </button>
                </div>
            ) : (
                // Formulir Login
                <form className="login-card login-form" onSubmit={handleSubmit}>
                    <div className="login-form-group">
                        <label className="login-field" htmlFor="username">
                            <span>Username</span>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                placeholder="Masukkan username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                autoComplete="username"
                                required
                            />
                        </label>

                        <label className="login-field" htmlFor="password">
                            <span>Password</span>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Masukkan password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                                required
                            />
                        </label>
                    </div>

                    {errorMessage && (
                        <div className="login-error-message" role="alert">
                            {errorMessage}
                        </div>
                    )}

                    <div className="login-form-footer">
                        <button
                            type="submit"
                            className="login-submit-button"
                            disabled={isLoading}
                        >
                            {isLoading ? "Memproses..." : "Login"}
                        </button>
                    </div>
                </form>
            )}
        </main>
    );
}

