"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePdf = CreatePdf;
const puppeteer_core_1 = __importDefault(require("puppeteer-core"));
const chrome_aws_lambda_1 = __importDefault(require("@sparticuz/chrome-aws-lambda"));
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
async function CreatePdf(data) {
    try {
        const browser = await puppeteer_core_1.default.launch({
            args: chrome_aws_lambda_1.default.args,
            defaultViewport: chrome_aws_lambda_1.default.defaultViewport,
            executablePath: await chrome_aws_lambda_1.default.executablePath,
            headless: chrome_aws_lambda_1.default.headless,
            ignoreHTTPSErrors: true,
        });
        const page = await browser.newPage();
        // Resolver __dirname
        const __dirname = path_1.default.resolve();
        // Leer el contenido del archivo index.html
        const htmlContent = await promises_1.default.readFile(path_1.default.join(__dirname, 'plantillaPDFVAR/index.html'), 'utf-8');
        const cssContent = await promises_1.default.readFile(path_1.default.join(__dirname, 'plantillaPDFVAR/styles.css'), 'utf-8');
        let filledContent = htmlContent.replace('<link rel="stylesheet" href="styles.css">', `<style>${cssContent}</style>`);
        const tailwindcss = await promises_1.default.readFile(path_1.default.join(__dirname, 'plantillaPDFVAR/tailwindCss.js'), 'base64');
        filledContent = filledContent.replace('src="tailwindCss.js"', `src="data:application/javascript;base64,${tailwindcss}"`);
        const fontQuickSand = await promises_1.default.readFile(path_1.default.join(__dirname, 'plantillaPDFVAR/fonts/Quicksand/Quicksand-VariableFont_wght.ttf'), 'base64');
        filledContent = filledContent.replace('url("fonts/Quicksand/Quicksand-VariableFont_wght.ttf")', `url("data:font/ttf;base64,${fontQuickSand}")`);
        // IMPORTACIÓN DE IMÁGENES Y SVG A BASE64
        const svgLogoClinica = await promises_1.default.readFile(path_1.default.join(__dirname, 'plantillaPDFVAR/images/logoCabecera.svg'), 'base64');
        filledContent = filledContent.replace('src="images/logoCabecera.svg"', `src="data:image/svg+xml;base64,${svgLogoClinica}"`);
        const svgPeso = await promises_1.default.readFile(path_1.default.join(__dirname, 'plantillaPDFVAR/images/peso.svg'), 'base64');
        filledContent = filledContent.replace('src="images/peso.svg"', `src="data:image/svg+xml;base64,${svgPeso}"`);
        const svgTalla = await promises_1.default.readFile(path_1.default.join(__dirname, 'plantillaPDFVAR/images/talla.svg'), 'base64');
        filledContent = filledContent.replace('src="images/talla.svg"', `src="data:image/svg+xml;base64,${svgTalla}"`);
        const svgCinturaM = await promises_1.default.readFile(path_1.default.join(__dirname, 'plantillaPDFVAR/images/cinturaM.svg'), 'base64');
        filledContent = filledContent.replace('src="images/cinturaM.svg"', `src="data:image/svg+xml;base64,${svgCinturaM}"`);
        const svgCaderaM = await promises_1.default.readFile(path_1.default.join(__dirname, 'plantillaPDFVAR/images/caderaM.svg'), 'base64');
        filledContent = filledContent.replace('src="images/caderaM.svg"', `src="data:image/svg+xml;base64,${svgCaderaM}"`);
        const svgCuello = await promises_1.default.readFile(path_1.default.join(__dirname, 'plantillaPDFVAR/images/cuello.svg'), 'base64');
        filledContent = filledContent.replace('src="images/cuello.svg"', `src="data:image/svg+xml;base64,${svgCuello}"`);
        const svgMuneca = await promises_1.default.readFile(path_1.default.join(__dirname, 'plantillaPDFVAR/images/muneca.svg'), 'base64');
        filledContent = filledContent.replace('src="images/muneca.svg"', `src="data:image/svg+xml;base64,${svgMuneca}"`);
        const svgIMC = await promises_1.default.readFile(path_1.default.join(__dirname, 'plantillaPDFVAR/images/imc.svg'), 'base64');
        filledContent = filledContent.replace('src="images/imc.svg"', `src="data:image/svg+xml;base64,${svgIMC}"`);
        const svgCinturaCaderaM = await promises_1.default.readFile(path_1.default.join(__dirname, 'plantillaPDFVAR/images/cintura-caderaM.svg'), 'base64');
        filledContent = filledContent.replace('src="images/cintura-caderaM.svg"', `src="data:image/svg+xml;base64,${svgCinturaCaderaM}"`);
        const svgJoven = await promises_1.default.readFile(path_1.default.join(__dirname, 'plantillaPDFVAR/images/joven.svg'), 'base64');
        filledContent = filledContent.replace('src="images/joven.svg"', `src="data:image/svg+xml;base64,${svgJoven}"`);
        const svgAdulto = await promises_1.default.readFile(path_1.default.join(__dirname, 'plantillaPDFVAR/images/adulto.svg'), 'base64');
        filledContent = filledContent.replace('src="images/adulto.svg"', `src="data:image/svg+xml;base64,${svgAdulto}"`);
        const svgViejo = await promises_1.default.readFile(path_1.default.join(__dirname, 'plantillaPDFVAR/images/viejo.svg'), 'base64');
        filledContent = filledContent.replace('src="images/viejo.svg"', `src="data:image/svg+xml;base64,${svgViejo}"`);
        // CAMBIAR VARIABLES GLOBALES DE LA PLANTILLA
        filledContent = filledContent.replace('{{fechaI}}', String(data.fechaI));
        filledContent = filledContent.replace('{{nombre}}', String(data.nombre));
        filledContent = filledContent.replace('{{apellido}}', String(data.apellido));
        filledContent = filledContent.replace('{{identificacion}}', String(data.identificacion));
        filledContent = filledContent.replace('{{direccion}}', String(data.direccion));
        filledContent = filledContent.replace('{{celular1}}', String(data.celular1));
        filledContent = filledContent.replace('{{celular2}}', String(data.celular2));
        filledContent = filledContent.replace('{{fechaN}}', String(data.fechaN));
        filledContent = filledContent.replace('{{edad}}', String(data.edad));
        filledContent = filledContent.replace('{{edad}}', String(data.edad));
        filledContent = filledContent.replace('{{edad}}', String(data.edad));
        filledContent = filledContent.replace('{{sexo}}', String(data.sexo));
        filledContent = filledContent.replace('{{estadoCivil}}', String(data.estadoCivil));
        filledContent = filledContent.replace('{{historiaN}}', String(data.historiaN));
        filledContent = filledContent.replace('{{fechaE}}', String(data.fechaE));
        filledContent = filledContent.replace('{{pesoAntro}}', String(data.pesoAntro));
        filledContent = filledContent.replace('{{cuelloAntro}}', String(data.cuelloAntro));
        filledContent = filledContent.replace('{{tallaAntro}}', String(data.tallaAntro));
        filledContent = filledContent.replace('{{munecaAntro}}', String(data.munecaAntro));
        filledContent = filledContent.replace('{{cinturaAntro}}', String(data.cinturaAntro));
        filledContent = filledContent.replace('{{imc}}', String(data.imc));
        filledContent = filledContent.replace('{{imcIndi}}', String(data.imcIndi));
        filledContent = filledContent.replace('{{caderaAntro}}', String(data.caderaAntro));
        filledContent = filledContent.replace('{{cinturaCadera}}', String(data.cinturaCadera));
        filledContent = filledContent.replace('{{cinturaCaderaIndi}}', String(data.cinturaCaderaIndi));
        filledContent = filledContent.replace('{{grasaCorpPORCENT}}', String(data.grasaCorpPORCENT));
        filledContent = filledContent.replace('{{grasaCorpPORCENT}}', String(data.grasaCorpPORCENT));
        filledContent = filledContent.replace('{{grasaCorpPORCENT_LIMIT}}', String(data.grasaCorpPORCENT >= '26' ? '27' : data.grasaCorpPORCENT));
        filledContent = filledContent.replace('{{grasaCorpKG}}', String(data.grasaCorpKG));
        filledContent = filledContent.replace('{{grasaCorpIndi}}', String(data.grasaCorpIndi));
        filledContent = filledContent.replace('{{pesoPerderRES}}', String(data.pesoPerderRES));
        filledContent = filledContent.replace('{{pesoIdealRES}}', String(data.pesoIdealRES));
        filledContent = filledContent.replace('{{kcalBasal}}', String(data.kcalBasal));
        filledContent = filledContent.replace('{{kcalBasalIdealRES}}', String(data.kcalBasalIdealRES));
        filledContent = filledContent.replace('{{edadCorporal}}', String(data.edadCorporal));
        filledContent = filledContent.replace('{{edadCorporal}}', String(data.edadCorporal));
        filledContent = filledContent.replace('{{grasaVisceral}}', String(data.grasaVisceral));
        filledContent = filledContent.replace('{{grasaVisceral_LIMIT}}', String(data.grasaVisceral >= '18' ? '17' : data.grasaVisceral));
        // Establecer el contenido de la página
        await page.setContent(filledContent);
        await page.emulateMediaType("screen");
        const pdfBuffer = await page.pdf({
            format: "letter",
            printBackground: true,
            path: 'prueba.pdf'
        });
        await browser.close();
        return pdfBuffer.toString('base64');
    }
    catch (error) {
        console.error('Error creating PDF:', error);
        return false;
    }
}
