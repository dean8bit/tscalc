import { useState } from "react";
import "./tscalc.css";

const TSCalc = () => {
	const [displayValue, setDisplayValue] = useState("0");
	const [registerValue, setRegisterValue] = useState("0");
	const [operatorValue, setOperatorValue] = useState("");
	const [awaitingNextValue, setAwaitingNextValue] = useState(false);

	const sendNumberValue = (num: number) =>
		displayValue === "Div 0"
			? setDisplayValue(`${num}`)
			: displayValue === "0"
			? setDisplayValue(`${num}`)
			: setDisplayValue(`${displayValue}${num}`);

	const sendClear = () => {
		setDisplayValue("0");
		setRegisterValue("0");
		setOperatorValue("");
		setAwaitingNextValue(false);
	};

	const sendOperator = (oper: string) => {
		setOperatorValue(oper);
		setDisplayValue("0");
		if (awaitingNextValue) return;
		setRegisterValue(displayValue);
		setAwaitingNextValue(true);
	};

	const sendDecimalValue = (dec: string) => {
		if (!displayValue.includes(dec)) setDisplayValue(`${displayValue}${dec}`);
	};

	const sendEquals = () => {
		if (operatorValue === "") return;
		if (displayValue === "Div 0") return;
		if (operatorValue === "÷" && displayValue === "0") {
			setDisplayValue("Div 0");
			return;
		}

		const val1 = parseFloat(registerValue);
		const val2 = parseFloat(displayValue);
		switch (operatorValue) {
			case "+":
				setDisplayValue((val1 + val2).toString());
				break;
			case "-":
				setDisplayValue((val1 - val2).toString());
				break;
			case "×":
				setDisplayValue((val1 * val2).toString());
				break;
			case "÷":
				setDisplayValue((val1 / val2).toString());
				break;
		}
		setAwaitingNextValue(false);
		setOperatorValue("");
	};

	const createNumberButton = (num: number) => {
		return (
			<button key={num} value={num.toString()} onClick={() => sendNumberValue(num)}>
				{num}
			</button>
		);
	};

	const createOperatorButton = (oper: string) => {
		return (
			<button
				key={oper}
				className="operator"
				value={oper.toString()}
				onClick={() => {
					sendOperator(oper);
				}}
			>
				{oper}
			</button>
		);
	};

	const createDecimalButton = (deci: string) => {
		return (
			<button
				key={deci}
				className="decimal"
				value={deci.toString()}
				onClick={() => {
					sendDecimalValue(deci);
				}}
			>
				{deci}
			</button>
		);
	};

	const createClearButton = (str: string) => {
		return (
			<button key={str} className="clear" id="clear-btn" value="+" onClick={() => sendClear()}>
				{str}
			</button>
		);
	};

	const createEqualsButton = (str: string) => {
		return (
			<button key={str} className="equal-sign operator" value="=" onClick={() => sendEquals()}>
				{str}
			</button>
		);
	};

	const buttons: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>[] = [
		...["+", "-", "×", "÷"].map((i) => createOperatorButton(i)),
		...[7, 8, 9, 4, 5, 6, 1, 2, 3].map((i) => createNumberButton(i)),
		createDecimalButton("."),
		createNumberButton(0),
		createClearButton("C"),
		createEqualsButton("="),
	];

	return (
		<div className="calculator-wrapper">
			<div className="calculator">
				<div className="calculator-display">
					<h1>{displayValue}</h1>
				</div>
				<div className="calculator-buttons">{buttons}</div>
			</div>
		</div>
	);
};

export default TSCalc;
