const { program } = require('commander');
const fs = require('fs');

program.option('-i, --input <path>', 'Шлях до вхідного файлу')
program.option('-o, --output <path>', 'Шлях до вихідного файлу')
program.option('-d, --display', 'Вивести результат у консоль')
program.option('-c, --cylinders', 'Відображати кількість циліндрів')
program.option('-m, --mpg <maxmpg>', 'Економність нижча за зазначену ')

program.parse(process.argv);
const options = program.opts();

if (!options.input) {
	console.error('Помилка: Please, specify input file');
	process.exit(1);
}

if (!fs.existsSync(options.input)) {
	console.error('Помилка: Cannot find input file');
	process.exit(1);
}

if (!options.output && !options.display) {
	process.exit(0);
}

try {
	const data = fs.readFileSync(options.input, 'utf8');
	const cars = JSON.parse(data);
	
	let filteredCars = cars;

	if (options.mpg) {
		filteredCars = filteredCars.filter(car => car.mpg < parseFloat(options.mpg));
	}

	const result = filteredCars.map(car => {
		const cylinders = options.cylinders ? ` ${car.cyl}` : '';
		return `${car.model}${cylinders} ${car.mpg}`;
	}).join('\n');

	if (options.display) {
		console.log('Результат');
		console.log(result);
	}
	if (options.output) {
		fs.writeFileSync(options.output, processingResult, 'utf8');
		console.log(`Результат було записано у файл ${options.output}`);
	}
} catch (err) {
	console.error('Виникла помилка', err);
	process.exit(1);
}

