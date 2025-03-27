const translations = {
  "hu": {
	"update": "Módosítás",
    "new": "Új",
    "save": "Mentés",
    "loading": "Betöltés",
    "clipboard": "Vágólap",
    "csv": "CSV",
    "sort": "Rendezés",
    "pluto": "PLUTO",
	"exp": "Exponenciális függvény",
	"sqrt": "Négyzetgyök függvény",
	"inc": "növekvő",
	"desc": "csökkenő",
    "mathTools": "Matematikai eszközök",
    "constant": "CONST",
    "autoTools": "Automatikus eszközök",
    "dataShow": "Adatvizualizáció",
    "dataShowDescription": "egyszerű adatmegjelenítő",
	"dataShowTooltip": "A kijelölt adatsorokat grafikonon ábrázolja vizuális elemzés céljából.",
    "connectSearch": "Összefüggések keresése",
    "connectSearchDescription": "intellignes korreláció vizsgálat",
	"connectSearchTooltip": "Ez a funkció segít megtalálni, hogy milyen kapcsolat lehet az adatsorok között – például hogy egyik hatással van-e a másikra.",
    "connectSearchSetup": "összefüggés vizsgálat beállítása",
    "connectSearchSetupType1": "Automatikus adatmennyiség korrekció",
    "connectSearchSetupType2": "Intelligens adattranszformáció alkalmazása",
	
	
	
	"optimumChoice": "Optimum kiválasztás",
    "optimumChoiceDescription": "robosztus kiválasztás (genetikus algoritmus)",
	"optimumChoiceTooltip": "Segít megtalálni azokat az adatsorokat, amelyek közel állnak az ideálishoz – gyorsan és megbízhatóan kiválasztja a legjobb lehetőségeket.",
    "manuTools": "Manuális eszközök",	
    "dataPreproc": "Előfeldolgozás",
    "dataPreprocDescription": "szűrés, skálázás, transzofrmáció, etc.",
	"dataPreprocTooltip": "Itt választhatsz különböző előkészítő lépéseket, hogy az adatokkal tisztán és jól használható formában dolgozhass tovább.",
	"dataPreprocNoise": "Zajszűrés",
	"dataPreprocNoiseType1": "Z-Score",
	"dataPreprocNoiseType2": "IQR",
	"dataPreprocNoiseType3": "Mozgóátlag",	
	"dataPreprocNoiseTooltip": 	"Eltávolítja az adatokból a kiugró vagy zavaró értékeket, hogy tisztább és megbízhatóbb eredményeket kaphass az elemzés során:\
								<br />&nbsp;<br />– <b>IQR:</b> kiszűri a szélsőséges értékeket a tartományon kívül.\
								<br />&nbsp;<br />– <b>Z-score:</b> az átlagtól való eltérések alapján azonosítja a kiugró pontokat.\
								<br />&nbsp;<br />– <b>Mozgóátlag:</b> kisimítja az ingadozásokat az adatsorban.",
	"dataPreprocScale": "Skálázás",
	"dataPreprocScaleType1": "Standardizáció",
	"dataPreprocScaleType2": "Min-Max [0;1]",
	"dataPreprocScaleType3": "Min-Max [-1;1]",	
	"dataPreprocScaleTooltip":	"Egységesíti az adatok mértékét, hogy azok összehasonlíthatók és jobban feldolgozhatók legyenek a további lépések során.\
								<br />&nbsp;<br />– <b>Standardizáció:</b> az adatokat átlag köré igazítja, egységnyi szórással.\
								<br />&nbsp;<br />– <b>Min–Max [0;1]:</b> az értékeket 0 és 1 közé nyújtja.\
								<br />&nbsp;<br />– <b>Min–Max [–1;1]:</b> az értékeket –1 és 1 közé skálázza.",
	"dataPreprocNormal": "Normalizálás",
	"dataPreprocNormalType1": "L2-norma",
	"dataPreprocNormalType2": "L1-norma",	
	"dataPreprocNormalTooltip": "Átalakítja az adatokat egy közös tartományba, hogy kiegyensúlyozottabbá és könnyebben kezelhetővé váljanak az elemzés során.\
								<br />&nbsp;<br />– <b>L2-norma:</b> minden sort úgy alakít át, hogy a teljes hosszúsága (távolsága) 1 legyen.\
								<br />&nbsp;<br />– <b>L1-norma:</b> minden sort úgy módosít, hogy az elemek összege 1 legyen.",
	"dataPreprocTransform": "Transzformáció",
	"dataPreprocTransformType1": "Logaritmus",
	"dataPreprocTransformType2": "Négyzetgyök",
	"dataPreprocTransformType3": "Reciprok",
	"dataPreprocTransformType4": "Power",	
	"dataPreprocTransformTooltip":	"Lehetővé teszi az adatok átalakítását, hogy azok jobban megfeleljenek az elemzés feltételeinek vagy kiemeljék a fontos mintázatokat.\
									<br />&nbsp;<br />– <b>Logaritmus:</b> csökkenti a nagy értékek hatását, kiegyensúlyozza az eloszlást.\
									<br />&nbsp;<br />– <b>Négyzetgyök:</b> kisimítja az ingadozásokat, segít a szórás csökkentésében.\
									<br />&nbsp;<br />– <b>Reciprok:</b> erőteljesen csökkenti a nagyobb értékeket, különösen erősen ferde eloszlásnál hasznos.\
									<br />&nbsp;<br />– <b>Power:</b> hatványozással módosítja az értékeket, kiemelve vagy tompítva az eltéréseket.",
    "dataImput": "Adatimputáció",
    "dataImputDescription": "hiányzó adatok kitöltése",
	"dataImputTooltip": "Segít kitölteni a hiányzó adatokat olyan értékekkel, amelyek a legjobban illenek az adatok összképéhez.",
	"dataImputMissingValue": "Hiányzó adat jelölése az adatsorban:",
	"dataImputRegression": "Regresszió",
	"dataImputRegressionTooltip": "Akkor érdemes használni, ha a hiányzó értékek más adatokból jó eséllyel kikövetkeztethetők.",
	"dataImputKnn": "Knn módszer",
	"dataImputKnnTooltip": "Akkor hasznos, ha vannak más, hasonló adatsorok – ez a módszer ezek alapján becsli meg a hiányzó értékeket.",
	"dataImputTimes": "Idősor interpoláció",
	"dataImputTimesTooltip": "Ha az adataid időrendben vannak, ez a módszer segít kitölteni a hiányzó értékeket az előtte és utána lévő értékek alapján.",	
	"dataFeature": "Jellemző kinyerés",
    "dataFeatureDescription": "feature engineering",
	"dataFeatureTooltip": "Segít olyan új adatpontokat létrehozni, amelyek jobban tükrözik a lényeges mintázatokat vagy összefüggéseket az adatokban.",	
	"dataFeaturePolinom": "Polinomális vektor",
	"dataFeaturePolinomTooltip": "Akkor használd, ha szeretnél új oszlopokat létrehozni úgy, hogy az adatok hatványait (pl. négyzet, köb) is figyelembe veszed – ez segíthet bonyolultabb összefüggések felismerésében.",
    "dataFeatureInteract": "Interakciós termék",
	"dataFeatureInteractTooltip": "Akkor használd, ha kíváncsi vagy arra, hogyan befolyásolják egymást az adatpontok – ez a művelet új jellemzőket hoz létre az oszlopok összeszorzásával.",
    "dataFeatureStat": "Statisztikai",
	"dataFeatureStatTooltip": "Akkor használd, ha szeretnél új adatpontokat létrehozni az adatok statisztikai tulajdonságai alapján – például átlag, szórás vagy maximum érték.",
    
	"newName": "Új név"
  },
 "de": {
	"update": "Bearbeiten",
	"new": "Neu",
	"save": "Speichern",
	"loading": "Laden",
	"clipboard": "Zwischenablage",
	"csv": "CSV",
	"sort": "Sortieren",
	"pluto": "PLUTO",
	"mathTools": "Mathematische Werkzeuge",
	"constant": "KONST",
	"autoTools": "Automatische Werkzeuge",
	"dataShow": "Datenvisualisierung",
	"dataShowDescription": "einfacher Datenanzeiger",
	"dataShowTooltip": "Stellt die ausgewählten Datensätze in einem Diagramm dar, um eine visuelle Analyse zu ermöglichen.",
	"connectSearch": "Zusammenhänge finden",
	"connectSearchDescription": "intelligente Korrelationsanalyse",
	"connectSearchTooltip": "Diese Funktion hilft dabei, Zusammenhänge zwischen den Datensätzen zu erkennen – z. B. ob einer den anderen beeinflusst.",
	"optimumChoice": "Optimale Auswahl",
	"optimumChoiceDescription": "robuste Auswahl (genetischer Algorithmus)",
	"optimumChoiceTooltip": "Hilft, jene Datensätze zu finden, die den Idealwerten am nächsten kommen – schnell und zuverlässig die besten Optionen auswählen.",
	"manuTools": "Manuelle Werkzeuge",
	"dataPreproc": "Vorverarbeitung",
	"dataPreprocDescription": "Filtern, Skalieren, Transformation usw.",
	"dataPreprocTooltip": "Hier kannst du verschiedene Vorverarbeitungsschritte auswählen, um mit sauberen und brauchbaren Daten weiterzuarbeiten.",
	"dataPreprocNoise": "Rauschfilterung",
	"dataPreprocNoiseTooltip": "Entfernt Ausreißer oder störende Werte aus den Daten, um während der Analyse klarere und verlässlichere Ergebnisse zu erzielen:\
							  <br />&nbsp;<br />– <b>IQR:</b> filtert extreme Werte außerhalb des Interquartilbereichs.\
							  <br />&nbsp;<br />– <b>Z-Score:</b> identifiziert Ausreißer anhand der Abweichung vom Mittelwert.\
							  <br />&nbsp;<br />– <b>Gleitender Mittelwert:</b> glättet Schwankungen innerhalb der Datenreihe.",
	"dataPreprocScale": "Skalierung",
	"dataPreprocScaleTooltip": "Vereinheitlicht den Wertebereich der Daten, damit sie vergleichbar und besser weiterverarbeitbar sind.\
							  <br />&nbsp;<br />– <b>Standardisierung:</b> zentriert die Daten um den Mittelwert mit Standardabweichung 1.\
							  <br />&nbsp;<br />– <b>Min–Max [0;1]:</b> skaliert die Werte auf den Bereich von 0 bis 1.\
							  <br />&nbsp;<br />– <b>Min–Max [–1;1]:</b> skaliert die Werte auf den Bereich von –1 bis 1.",
	"dataPreprocNormal": "Normalisierung",
	"dataPreprocNormalTooltip": "Transformiert die Daten in einen einheitlichen Bereich, um sie ausbalancierter und leichter analysierbar zu machen.\
							  <br />&nbsp;<br />– <b>L2-Norm:</b> skaliert jede Zeile so, dass ihre Länge (Distanz) 1 beträgt.\
							  <br />&nbsp;<br />– <b>L1-Norm:</b> skaliert jede Zeile so, dass die Summe der Elemente 1 beträgt.",
	"dataPreprocTransform": "Transformation",
	"dataPreprocTransformTooltip": "Ermöglicht die Umwandlung der Daten, um sie besser an Analysebedingungen anzupassen oder wichtige Muster hervorzuheben.\
								  <br />&nbsp;<br />– <b>Logarithmus:</b> verringert den Einfluss großer Werte, balanciert die Verteilung.\
								  <br />&nbsp;<br />– <b>Quadratwurzel:</b> glättet Schwankungen, reduziert die Streuung.\
								  <br />&nbsp;<br />– <b>Reziprok:</b> reduziert große Werte stark, nützlich bei stark schiefer Verteilung.\
								  <br />&nbsp;<br />– <b>Potenz:</b> verändert Werte durch Potenzierung, um Unterschiede hervorzuheben oder abzuschwächen.",
	"dataImput": "Datenimputation",
	"dataImputDescription": "fehlende Daten auffüllen",
	"dataImputTooltip": "Hilft, fehlende Werte mit solchen zu ersetzen, die gut zum Gesamtdatensatz passen.",
	"dataImputRegression": "",
	"dataImputRegressionTooltip": "Empfohlen, wenn fehlende Werte mit hoher Wahrscheinlichkeit aus anderen Daten abgeleitet werden können.",
	"dataImputKnn": "Knn-Methode",
	"dataImputKnnTooltip": "Hilfreich, wenn ähnliche Datensätze existieren – schätzt fehlende Werte auf Basis dieser.",
	"dataImputTimes": "Zeitreiheninterpolation",
	"dataImputTimesTooltip": "Wenn deine Daten zeitlich geordnet sind, hilft diese Methode, fehlende Werte anhand vorheriger und nachfolgender Werte zu ergänzen.",
	"dataFeature": "Merkmalsextraktion",
	"dataFeatureDescription": "Feature Engineering",
	"dataFeatureTooltip": "Hilft dabei, neue Datenpunkte zu erzeugen, die relevante Muster oder Zusammenhänge besser widerspiegeln.",
	"dataFeaturePolinom": "Polynomvektor",
	"dataFeaturePolinomTooltip": "Nutze dies, um neue Spalten zu erstellen, indem du Potenzen der bestehenden Daten (z. B. Quadrat, Kubik) berücksichtigst – hilfreich bei komplexeren Zusammenhängen.",
	"dataFeatureInteract": "Interaktionsterm",
	"dataFeatureInteractTooltip": "Wenn du wissen willst, wie sich Daten gegenseitig beeinflussen – dieser Schritt erstellt neue Merkmale durch Multiplikation der Spalten.",
	"dataFeatureStat": "Statistisch",
	"dataFeatureStatTooltip": "Wenn du neue Datenpunkte aus statistischen Eigenschaften (z. B. Mittelwert, Standardabweichung oder Maximum) erzeugen willst.",
	"newName": "Neuer Name"
},
"en": {
	"update": "Edit",
	"new": "New",
	"save": "Save",
	"loading": "Loading",
	"clipboard": "Clipboard",
	"csv": "CSV",
	"sort": "Sort",
	"pluto": "PLUTO",
	"mathTools": "Mathematical Tools",
	"constant": "CONST",
	"autoTools": "Automatic Tools",
	"dataShow": "Data Visualization",
	"dataShowDescription": "simple data viewer",
	"dataShowTooltip": "Displays the selected data series on a chart for visual analysis.",
	"connectSearch": "Find Connections",
	"connectSearchDescription": "intelligent correlation analysis",
	"connectSearchTooltip": "This function helps to identify possible relationships between data series – for example, whether one affects the other.",
	"optimumChoice": "Optimum Selection",
	"optimumChoiceDescription": "robust selection (genetic algorithm)",
	"optimumChoiceTooltip": "Helps find the data series that are closest to the ideal – quickly and reliably selects the best options.",
	"manuTools": "Manual Tools",
	"dataPreproc": "Preprocessing",
	"dataPreprocDescription": "filtering, scaling, transformation, etc.",
	"dataPreprocTooltip": "Here you can choose various preparation steps to work with clean and usable data.",
	"dataPreprocNoise": "Noise Filtering",
	"dataPreprocNoiseTooltip": "Removes outliers or disruptive values from the data to produce cleaner and more reliable results during analysis:\
							  <br />&nbsp;<br />– <b>IQR:</b> filters extreme values outside the interquartile range.\
							  <br />&nbsp;<br />– <b>Z-score:</b> identifies outliers based on deviation from the mean.\
							  <br />&nbsp;<br />– <b>Moving Average:</b> smooths fluctuations in the data series.",
	"dataPreprocScale": "Scaling",
	"dataPreprocScaleTooltip": "Unifies the scale of data so that it can be compared and better processed in further steps.\
							  <br />&nbsp;<br />– <b>Standardization:</b> centers data around the mean with a standard deviation of one.\
							  <br />&nbsp;<br />– <b>Min–Max [0;1]:</b> stretches values between 0 and 1.\
							  <br />&nbsp;<br />– <b>Min–Max [–1;1]:</b> scales values between –1 and 1.",
	"dataPreprocNormal": "Normalization",
	"dataPreprocNormalTooltip": "Transforms the data into a common range for more balanced and manageable analysis.\
							  <br />&nbsp;<br />– <b>L2-norm:</b> adjusts each row so its total length (distance) becomes 1.\
							  <br />&nbsp;<br />– <b>L1-norm:</b> adjusts each row so the sum of the elements becomes 1.",
	"dataPreprocTransform": "Transformation",
	"dataPreprocTransformTooltip": "Enables transforming the data to better fit analysis requirements or highlight important patterns.\
								  <br />&nbsp;<br />– <b>Logarithm:</b> reduces the impact of large values and balances distribution.\
								  <br />&nbsp;<br />– <b>Square Root:</b> smooths fluctuations and helps reduce variance.\
								  <br />&nbsp;<br />– <b>Reciprocal:</b> strongly reduces large values; useful for highly skewed distributions.\
								  <br />&nbsp;<br />– <b>Power:</b> modifies values by exponentiation, enhancing or reducing differences.",
	"dataImput": "Data Imputation",
	"dataImputDescription": "fill in missing data",
	"dataImputTooltip": "Helps fill in missing values with those that best match the overall data pattern.",
	"dataImputRegression": "",
	"dataImputRegressionTooltip": "Useful when missing values can likely be inferred from other data.",
	"dataImputKnn": "Knn Method",
	"dataImputKnnTooltip": "Helpful when similar datasets exist – estimates missing values based on them.",
	"dataImputTimes": "Time Series Interpolation",
	"dataImputTimesTooltip": "If your data is time-ordered, this method fills in missing values based on previous and following values.",
	"dataFeature": "Feature Extraction",
	"dataFeatureDescription": "feature engineering",
	"dataFeatureTooltip": "Helps create new data points that better reflect meaningful patterns or relationships in the data.",
	"dataFeaturePolinom": "Polynomial Vector",
	"dataFeaturePolinomTooltip": "Use this to create new columns by including powers of the data (e.g., squared, cubed) – helpful for identifying more complex relationships.",
	"dataFeatureInteract": "Interaction Term",
	"dataFeatureInteractTooltip": "Use this when you want to explore how data points influence each other – this creates new features by multiplying columns together.",
	"dataFeatureStat": "Statistical",
	"dataFeatureStatTooltip": "Use this to create new data points based on statistical properties – such as mean, standard deviation, or maximum.",
	"newName": "New Name"
}

};


let currentLang = "hu";

function setLanguage(lang) {
    currentLang = lang;
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (translations[lang][key]) {
            if (el.placeholder !== undefined && el.tagName === "INPUT") {
                el.placeholder = translations[lang][key];
            } else {
                el.innerHTML = translations[lang][key];
            }
        }
    });
}

setLanguage(currentLang);
