import { useEffect, useState, type FormEvent } from "react";

type Mahasiswa = {
	nim: string;
	nama: string;
	email: string;
	jurusan: string;
	angkatan: number;
};

const daftarJurusan = [
	"Teknik Informatika",
	"Manajemen Informatika",
	"Sistem Informasi",
	"Teknik Komputer",
	"Teknik Elektro",
	"Teknik Mesin",
	"Teknik Sipil",
];

export default function TambahMahasiswa() {
	const [mahasiswa, setMahasiswa] = useState<Mahasiswa[]>([]);
	const [berhasil, setBerhasil] = useState(false);
    useEffect(() => {
        fetchMahasiswa();
    }, []);
    async function fetchMahasiswa() {
        const response = await fetch("http://localhost:3000/api/mahasiswa");
        if (response.ok) {
            const data = await response.json();
            setMahasiswa(data);
        }
    }
	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);

		setMahasiswa((dataSebelumnya) => [
			...dataSebelumnya,
			{
				nim: String(formData.get("nim")),
				nama: String(formData.get("nama")),
				email: String(formData.get("email")),
				jurusan: String(formData.get("jurusan")),
				angkatan: Number(formData.get("angkatan")),
			},
		]);
        await fetch("http://localhost:3000/api/mahasiswa", {
            headers : {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                nim: String(formData.get("nim")),
                nama: String(formData.get("nama")),
                email: String(formData.get("email")),
                jurusan: String(formData.get("jurusan")),
                angkatan: Number(formData.get("angkatan")),
            })
        })
		setBerhasil(true);
		event.currentTarget.reset();
	}

	return (
		<main className="mahasiswa-page">
			<section className="mahasiswa-heading">
				<p className="mahasiswa-eyebrow">DATA AKADEMIK</p>
				<h1>Tambah Mahasiswa</h1>
				<p>Lengkapi informasi mahasiswa untuk menambahkannya ke daftar.</p>
			</section>

			<form className="mahasiswa-form" onSubmit={handleSubmit} onChange={() => setBerhasil(false)}>
				<div className="mahasiswa-form-grid">
					<label className="mahasiswa-field" htmlFor="nim">
						<span>NIM</span>
						<input id="nim" name="nim" type="text" placeholder="Contoh: 20260001" autoComplete="off" required />
					</label>
					<label className="mahasiswa-field" htmlFor="nama">
						<span>Nama lengkap</span>
						<input id="nama" name="nama" type="text" placeholder="Masukkan nama mahasiswa" autoComplete="name" required />
					</label>
					<label className="mahasiswa-field" htmlFor="email">
						<span>Email</span>
						<input id="email" name="email" type="email" placeholder="nama@email.com" autoComplete="email" required />
					</label>
					<label className="mahasiswa-field" htmlFor="jurusan">
						<span>Jurusan</span>
						<select id="jurusan" name="jurusan" defaultValue="" required>
							<option value="" disabled>Pilih jurusan</option>
							{daftarJurusan.map((jurusan) => (
								<option key={jurusan} value={jurusan}>{jurusan}</option>
							))}
						</select>
					</label>
					<label className="mahasiswa-field" htmlFor="angkatan">
						<span>Angkatan</span>
						<input id="angkatan" name="angkatan" type="number" min="2000" max={new Date().getFullYear()} placeholder="Contoh: 2026" required />
					</label>
				</div>

				<div className="mahasiswa-form-footer">
					<p className="mahasiswa-form-message" role="status">
						{berhasil ? "Data mahasiswa berhasil ditambahkan." : "Semua kolom wajib diisi."}
					</p>
					<button className="mahasiswa-submit" type="submit">Tambah mahasiswa</button>
				</div>
			</form>

			{mahasiswa.length > 0 && (
				<section className="mahasiswa-results" aria-labelledby="daftar-mahasiswa-title">
					<div className="mahasiswa-results-heading">
						<h2 id="daftar-mahasiswa-title">Mahasiswa ditambahkan</h2>
						<span>{mahasiswa.length}</span>
					</div>
					<div className="mahasiswa-table-wrap">
						<table>
							<thead>
								<tr>
									<th>NIM</th>
									<th>Nama</th>
									<th>Email</th>
									<th>Jurusan</th>
									<th>Angkatan</th>
								</tr>
							</thead>
							<tbody>
								{mahasiswa.map((data, index) => (
									<tr key={`${data.nim}-${index}`}>
										<td>{data.nim}</td>
										<td>{data.nama}</td>
										<td>{data.email}</td>
										<td>{data.jurusan}</td>
										<td>{data.angkatan}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</section>
			)}
		</main>
	);
}