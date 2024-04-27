import "./App.css";

function App() {
	return (
		<>
			<body className="h-screen flex flex-col justify-center items-center mx-auto">
				<div className="max-w-6xl p-6 bg-white border border-gray-200 rounded-lg shadow ">
					<h5 className="mb-2 text-start text-2xl font-bold tracking-tight text-gray-900">
						Password Generator
					</h5>
					<input
						type="text"
						id="password"
						className="bg-gray-50 mb-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:ring w-full p-2.5 "
						readOnly
					/>

					<div className="mb-4">
						{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
						<button
							id="copy-btn"
							className="px-6 py-2 mb-4 bg-gray-500 w-full  
                           text-white rounded-md 
                           hover:bg-gray-600 
                           focus:outline-none"
						>
							Copy Password
						</button>

						{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
						<button
							id="generate-btn"
							className="px-6 py-2 bg-blue-500 text-white w-full
                           rounded-md hover:bg-blue-600 
                           focus:outline-none"
						>
							Generate Password
						</button>
					</div>
				</div>
			</body>

			<script src="./script.ts" />
		</>
	);
}

export default App;
