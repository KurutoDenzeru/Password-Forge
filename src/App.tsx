import type React from "react";
import { useState, useEffect } from "react";

const App: React.FC = () => {
	const [password, setPassword] = useState<string>("");
	const [length, setLength] = useState<number>(8);
	const [includeUppercase, setIncludeUppercase] = useState<boolean>(false);
	const [includeLowercase, setIncludeLowercase] = useState<boolean>(false);
	const [includeNumbers, setIncludeNumbers] = useState<boolean>(false);
	const [includeSymbols, setIncludeSymbols] = useState<boolean>(false);

	const generatePassword = () => {
		const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
		const numberChars = "0123456789";
		const symbolChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

		let charSet = "";
		if (includeUppercase) charSet += uppercaseChars;
		if (includeLowercase) charSet += lowercaseChars;
		if (includeNumbers) charSet += numberChars;
		if (includeSymbols) charSet += symbolChars;

		let generatedPassword = "";
		for (let i = 0; i < length; i++) {
			generatedPassword += charSet.charAt(
				Math.floor(Math.random() * charSet.length),
			);
		}

		setPassword(generatedPassword);
	};

	const copyPassword = () => {
		navigator.clipboard.writeText(password);
	};

	const handleLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newLength = Number.parseInt(e.target.value, 10);
		if (newLength >= 4 && newLength <= 32) {
			setLength(newLength);
		}
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (
			includeUppercase ||
			includeLowercase ||
			includeNumbers ||
			includeSymbols
		) {
			generatePassword();
		}
	}, [
		includeUppercase,
		includeLowercase,
		includeNumbers,
		includeSymbols,
		length,
	]);

	return (
		<>
			<body className="flex justify-center items-center h-screen m-4">
				<div className="max-w-6xl p-6 bg-white border border-gray-200 rounded-lg shadow ">
					<h5 className="mb-2 text-start text-2xl font-bold tracking-tight text-gray-900">
						Password Generator
					</h5>
					{/* Inputs */}
					<input
						type="text"
						id="password"
						className="bg-gray-50 mb-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:ring w-full p-2.5 "
						readOnly
						value={password}
					/>
					{/* Input Length */}
					<label htmlFor="length" className="mb-4 text-gray-900">
						Length:
					</label>
					<input
						type="number"
						id="length"
						min="4"
						max="32"
						value={length}
						className="bg-gray-50 mb-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:ring w-full p-2.5 "
						onChange={handleLengthChange}
					/>
					<p id="length-error" className="error-message hidden">
						Please enter a length between 4 and 20.
					</p>
					{/* Checkboxes / Radio buttons */}
					<div className="mb-4 flex flex-col text-gray-900">
						<label className="mb-2">Include:</label>
						<label className="flex items-center mb-1">
							<input
								type="checkbox"
								id="uppercase"
								className="mr-2 ms-2"
								checked={includeUppercase}
								onChange={(e) => setIncludeUppercase(e.target.checked)}
							/>
							Uppercase
						</label>
						<label className="flex items-center mb-1">
							<input
								type="checkbox"
								id="lowercase"
								className="mr-2 ms-2"
								checked={includeLowercase}
								onChange={(e) => setIncludeLowercase(e.target.checked)}
							/>
							Lowercase
						</label>
						<label className="flex items-center mb-1">
							<input
								type="checkbox"
								id="numbers"
								className="mr-2 ms-2"
								checked={includeNumbers}
								onChange={(e) => setIncludeNumbers(e.target.checked)}
							/>
							Numbers
						</label>
						<label className="flex items-center">
							<input
								type="checkbox"
								id="symbols"
								className="mr-2 ms-2"
								checked={includeSymbols}
								onChange={(e) => setIncludeSymbols(e.target.checked)}
							/>
							Symbols
						</label>
					</div>
					{/* Buttons */}
					<div className="mb-4">
						{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
						<button
							id="copy-btn"
							className="px-6 py-2 bg-gray-500 w-full text-white rounded-md hover:bg-gray-600 focus:outline-none"
							onClick={copyPassword}
						>
							Copy Password
						</button>
						<div className="mb-4 flex flex-col">
							{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
							<button
								id="generate-btn"
								className="px-6 py-2 mt-4 bg-blue-500 text-white w-full rounded-md hover:bg-blue-600 focus:outline-none"
								onClick={generatePassword}
							>
								Generate Password
							</button>
						</div>
					</div>
					{/* Buttons */}
				</div>
			</body>
		</>
	);
};

export default App;
