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
					<div className="w-full max-w-sm">
						<div className="flex items-center">
							<span className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg">
								🔑
							</span>
							<div className="relative w-full">
								<input
									id="password"
									type="text"
									aria-describedby="helper-text-explanation"
									className="bg-gray-50 border border-e-0 border-gray-300 text-gray-500 dark:text-gray-400 text-sm border-s-0 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
									readOnly
									disabled
									value={password}
								/>
							</div>
							<button
								data-tooltip-target="tooltip-website-url"
								data-copy-to-clipboard-target="website-url"
								id="copy-btn"
								className="flex-shrink-0 z-10 inline-flex items-center py-3 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-e-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
								type="button"
								onClick={copyPassword}
							>
								<span id="default-icon">
									<svg
										className="w-4 h-4"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										fill="currentColor"
										viewBox="0 0 18 20"
									>
										<path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
									</svg>
								</span>
								<span
									id="success-icon"
									className="hidden inline-flex items-center"
								>
									<svg
										className="w-4 h-4"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 16 12"
									>
										<path
											stroke="currentColor"
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M1 5.917 5.724 10.5 15 1.5"
										/>
									</svg>
								</span>
							</button>
							<div
								id="tooltip-website-url"
								role="tooltip"
								className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
							>
								<span id="default-tooltip-message">Copy link</span>
								<span id="success-tooltip-message" className="hidden">
									Copied!
								</span>
								<div className="tooltip-arrow" data-popper-arrow />
							</div>
						</div>
					</div>

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
