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
    "mathTools": "Matematikai eszközök",
    "constant": "CONST",
    "autoTools": "Automatikus eszközök",
    "dataShow": "Adatvizualizáció",
    "dataShowDescription": "egyszerű adatmegjelenítő",
	"dataShowTooltip": "A kijelölt adatsorokat grafikonon ábrázolja vizuális elemzés céljából.",
    "connectSearch": "Összefüggések keresése",
    "connectSearchDescription": "intellignes korreláció vizsgálat",
	"connectSearchTooltip": "Ez a funkció segít megtalálni, hogy milyen kapcsolat lehet az adatsorok között – például hogy egyik hatással van-e a másikra.",
    "optimumChoice": "Optimum kiválasztás",
    "optimumChoiceDescription": "robosztus kiválasztás (genetikus algoritmus)",
	"optimumChoiceTooltip": "Segít megtalálni azokat az adatsorokat, amelyek közel állnak az ideálishoz – gyorsan és megbízhatóan kiválasztja a legjobb lehetőségeket.",
    "manuTools": "Manuális eszközök",	
    "dataPreproc": "Előfeldolgozás",
    "dataPreprocDescription": "szűrés, skálázás, transzofrmáció, etc.",
	"dataPreprocTooltip": "Itt választhatsz különböző előkészítő lépéseket, hogy az adatokkal tisztán és jól használható formában dolgozhass tovább.",
	"dataPreprocNoise": 	"Eltávolítja az adatokból a kiugró vagy zavaró értékeket, hogy tisztább és megbízhatóbb eredményeket kaphass az elemzés során:\
							<br />&nbsp;<br />– <b>IQR:</b> kiszűri a szélsőséges értékeket a tartományon kívül.\
							<br />&nbsp;<br />– <b>Z-score:</b> az átlagtól való eltérések alapján azonosítja a kiugró pontokat.\
							<br />&nbsp;<br />– <b>Mozgóátlag:</b> kisimítja az ingadozásokat az adatsorban.",
	"dataPreprocScale":		"Egységesíti az adatok mértékét, hogy azok összehasonlíthatók és jobban feldolgozhatók legyenek a további lépések során.\
							<br />&nbsp;<br />– <b>Standardizáció:</b> az adatokat átlag köré igazítja, egységnyi szórással.\
							<br />&nbsp;<br />– <b>Min–Max [0;1]:</b> az értékeket 0 és 1 közé nyújtja.\
							<br />&nbsp;<br />– <b>Min–Max [–1;1]:</b> az értékeket –1 és 1 közé skálázza.",
	"dataPreprocNormal": 	"Átalakítja az adatokat egy közös tartományba, hogy kiegyensúlyozottabbá és könnyebben kezelhetővé váljanak az elemzés során.\
							<br />&nbsp;<br />– <b>L2-norma:</b> minden sort úgy alakít át, hogy a teljes hosszúsága (távolsága) 1 legyen.\
							<br />&nbsp;<br />– <b>L1-norma:</b> minden sort úgy módosít, hogy az elemek összege 1 legyen.",
	"dataPreprocTransform":	"Lehetővé teszi az adatok átalakítását, hogy azok jobban megfeleljenek az elemzés feltételeinek vagy kiemeljék a fontos mintázatokat.\
							<br />&nbsp;<br />– <b>Logaritmus:</b> csökkenti a nagy értékek hatását, kiegyensúlyozza az eloszlást.\
							<br />&nbsp;<br />– <b>Négyzetgyök:</b> kisimítja az ingadozásokat, segít a szórás csökkentésében.\
							<br />&nbsp;<br />– <b>Reciprok:</b> erőteljesen csökkenti a nagyobb értékeket, különösen erősen ferde eloszlásnál hasznos.\
							<br />&nbsp;<br />– <b>Power:</b> hatványozással módosítja az értékeket, kiemelve vagy tompítva az eltéréseket.",
    "dataImput": "Adatimputáció",
    "dataImputDescription": "hiányzó adatok kitöltése",
	"dataImputTooltip": "Segít kitölteni a hiányzó adatokat olyan értékekkel, amelyek a legjobban illenek az adatok összképéhez.",
	"dataImputRegression": "Akkor érdemes használni, ha a hiányzó értékek más adatokból jó eséllyel kikövetkeztethetők.",
	"dataImputKnn": "Akkor hasznos, ha vannak más, hasonló adatsorok – ez a módszer ezek alapján becsli meg a hiányzó értékeket.",
	"dataImputTimes": "Ha az adataid időrendben vannak, ez a módszer segít kitölteni a hiányzó értékeket az előtte és utána lévő értékek alapján.",	
    "dataFeature": "Jellemző kinyerés",
    "dataFeatureDescription": "feature engineering",
	"dataFeatureTooltip": "Segít olyan új adatpontokat létrehozni, amelyek jobban tükrözik a lényeges mintázatokat vagy összefüggéseket az adatokban.",	
	"dataFeaturePolinom": "Akkor használd, ha szeretnél új oszlopokat létrehozni úgy, hogy az adatok hatványait (pl. négyzet, köb) is figyelembe veszed – ez segíthet bonyolultabb összefüggések felismerésében.",
    "dataFeatureInteract": "Akkor használd, ha kíváncsi vagy arra, hogyan befolyásolják egymást az adatpontok – ez a művelet új jellemzőket hoz létre az oszlopok összeszorzásával.",
    "dataFeatureStat": "Akkor használd, ha szeretnél új adatpontokat létrehozni az adatok statisztikai tulajdonságai alapján – például átlag, szórás vagy maximum érték.",
    "newName": "Új név"
  },
  "de": {
"update": "Aktualisieren",
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
    "dataShowDescription": "einfache Datenanzeige",
    "dataShowTooltip": "Stellt die ausgewählten Datenreihen zur visuellen Analyse in einem Diagramm dar.",
    "connectSearch": "Zusammenhänge erkennen",
    "connectSearchDescription": "intelligente Korrelationsanalyse",
    "connectSearchTooltip": "Hilft dabei zu erkennen, ob und wie Datensätze miteinander in Beziehung stehen – z. B. ob einer den anderen beeinflusst.",
    "optimumChoice": "Optimale Auswahl",
    "optimumChoiceDescription": "robuste Auswahl (genetischer Algorithmus)",
    "optimumChoiceTooltip": "Findet zuverlässig die besten Datensätze, die nahe an der Idealvorstellung liegen – schnell und effizient.",
    "manuTools": "Manuelle Werkzeuge",
    "dataPreproc": "Vorverarbeitung",
    "dataPreprocDescription": "Filtern, Skalieren, Transformieren usw.",
    "dataPreprocTooltip": "Hier kannst du verschiedene vorbereitende Schritte auswählen, um mit sauberen und gut nutzbaren Daten weiterzuarbeiten.",
    "dataPreprocNoise": "Entfernt Ausreißer oder störende Werte aus den Daten, um eine klarere und zuverlässigere Analyse zu ermöglichen:<br />&nbsp;<br />– <b>IQR:</b> entfernt extreme Werte außerhalb des Bereichs.<br />&nbsp;<br />– <b>Z-Score:</b> identifiziert Ausreißer basierend auf der Abweichung vom Mittelwert.<br />&nbsp;<br />– <b>Gleitender Durchschnitt:</b> glättet Schwankungen in der Datenreihe.",
    "dataPreprocScale": "Normiert die Skala der Daten, sodass sie vergleichbar und besser weiterverarbeitet werden können.<br />&nbsp;<br />– <b>Standardisierung:</b> zentriert die Werte um den Mittelwert und normiert die Streuung.<br />&nbsp;<br />– <b>Min–Max [0;1]:</b> skaliert die Werte zwischen 0 und 1.<br />&nbsp;<br />– <b>Min–Max [–1;1]:</b> skaliert die Werte zwischen –1 und 1.",
    "dataPreprocNormal": "Bringt die Daten auf eine gemeinsame Norm, um sie ausgeglichener und leichter verarbeitbar zu machen.<br />&nbsp;<br />– <b>L2-Norm:</b> jede Zeile hat eine Gesamtlänge (Distanz) von 1.<br />&nbsp;<br />– <b>L1-Norm:</b> jede Zeile wird so angepasst, dass die Summe der Elemente 1 ergibt.",
    "dataPreprocTransform": "Ermöglicht die Umwandlung der Daten, um sie besser an die Analysebedingungen anzupassen oder wichtige Muster hervorzuheben.<br />&nbsp;<br />– <b>Logarithmus:</b> verringert den Einfluss großer Werte, gleicht die Verteilung aus.<br />&nbsp;<br />– <b>Wurzel:</b> glättet Schwankungen, reduziert die Streuung.<br />&nbsp;<br />– <b>Reziprok:</b> reduziert stark große Werte, nützlich bei stark schiefer Verteilung.<br />&nbsp;<br />– <b>Potenzfunktion:</b> verändert Werte durch Potenzierung – verstärkt oder schwächt Unterschiede.",
    "dataImput": "Datenimputation",
    "dataImputDescription": "fehlende Werte ergänzen",
    "dataImputTooltip": "Hilft dabei, fehlende Daten mit Werten zu füllen, die am besten zum Gesamtdatenbild passen.",
    "dataImputRegression": "Empfohlen, wenn fehlende Werte mit hoher Wahrscheinlichkeit aus anderen Daten ableitbar sind.",
    "dataImputKnn": "Hilfreich, wenn ähnliche Datenreihen vorhanden sind – diese Methode schätzt fehlende Werte anhand dieser Ähnlichkeiten.",
    "dataImputTimes": "Wenn deine Daten zeitlich geordnet sind, ergänzt diese Methode fehlende Werte anhand vorheriger und nachfolgender Punkte.",
    "dataFeature": "Merkmalsextraktion",
    "dataFeatureDescription": "Feature Engineering",
    "dataFeatureTooltip": "Hilft, neue Merkmale aus den Daten abzuleiten, die wichtige Muster oder Zusammenhänge besser sichtbar machen.",
    "dataFeaturePolinom": "Nutze dies, um neue Spalten basierend auf Potenzen der Daten (z. B. Quadrat, Kubik) zu erstellen – hilfreich für komplexere Zusammenhänge.",
    "dataFeatureInteract": "Nutze dies, um herauszufinden, wie sich Merkmale gegenseitig beeinflussen – durch Multiplikation entstehen neue Features.",
    "dataFeatureStat": "Nutze dies, um neue Merkmale aus statistischen Eigenschaften der Daten zu erstellen – z. B. Mittelwert, Streuung oder Maximum.",
    "newName": "Neuer Name"   
  },
"en": {
    "update": "Update",
    "new": "New",
    "save": "Save",
    "loading": "Load",
    "clipboard": "Clipboard",
    "csv": "CSV",
    "sort": "Sort",
    "pluto": "PLUTO",
    "mathTools": "Mathematical Tools",
    "constant": "CONST",
    "autoTools": "Automatic Tools",
    "dataShow": "Data Visualization",
    "dataShowDescription": "simple data display",
    "dataShowTooltip": "Displays the selected data series on a chart for visual analysis.",
    "connectSearch": "Find Relationships",
    "connectSearchDescription": "intelligent correlation analysis",
    "connectSearchTooltip": "Helps discover if and how data series are related – e.g. if one affects another.",
    "optimumChoice": "Optimal Selection",
    "optimumChoiceDescription": "robust selection (genetic algorithm)",
    "optimumChoiceTooltip": "Helps identify the data sets closest to the ideal – selecting the best ones quickly and reliably.",
    "manuTools": "Manual Tools",
    "dataPreproc": "Preprocessing",
    "dataPreprocDescription": "filtering, scaling, transformation, etc.",
    "dataPreprocTooltip": "Choose from various preparatory steps to work with clean and well-structured data.",
    "dataPreprocNoise": "Removes outliers or noisy values from the data for clearer and more reliable analysis:<br />&nbsp;<br />– <b>IQR:</b> filters extreme values outside the range.<br />&nbsp;<br />– <b>Z-score:</b> detects outliers based on deviation from the mean.<br />&nbsp;<br />– <b>Moving Average:</b> smooths out fluctuations in the data series.",
    "dataPreprocScale": "Unifies the scale of data to make them comparable and more processable in later steps.<br />&nbsp;<br />– <b>Standardization:</b> adjusts data around the mean with unit variance.<br />&nbsp;<br />– <b>Min–Max [0;1]:</b> scales values between 0 and 1.<br />&nbsp;<br />– <b>Min–Max [–1;1]:</b> scales values between –1 and 1.",
    "dataPreprocNormal": "Normalizes data into a common range for better balance and ease of processing.<br />&nbsp;<br />– <b>L2 norm:</b> each row's total length (distance) becomes 1.<br />&nbsp;<br />– <b>L1 norm:</b> each row is modified so that the sum of its elements is 1.",
    "dataPreprocTransform": "Allows transforming data to better suit analysis conditions or highlight important patterns.<br />&nbsp;<br />– <b>Logarithm:</b> reduces the effect of large values, balances distribution.<br />&nbsp;<br />– <b>Square Root:</b> smooths fluctuations, reduces variance.<br />&nbsp;<br />– <b>Reciprocal:</b> strongly reduces large values – useful for highly skewed distributions.<br />&nbsp;<br />– <b>Power:</b> modifies values using exponentiation to emphasize or soften differences.",
    "dataImput": "Data Imputation",
    "dataImputDescription": "fill in missing data",
    "dataImputTooltip": "Helps fill in missing values with data that best fit the overall dataset.",
    "dataImputRegression": "Use when missing values can likely be inferred from other data.",
    "dataImputKnn": "Useful when similar data series exist – estimates missing values based on them.",
    "dataImputTimes": "If your data is time-ordered, this method fills missing values based on nearby points.",
    "dataFeature": "Feature Extraction",
    "dataFeatureDescription": "feature engineering",
    "dataFeatureTooltip": "Helps generate new data points that better reflect key patterns or relationships in the data.",
    "dataFeaturePolinom": "Use this to create new columns by considering powers of data (e.g. squared, cubed) – useful for complex relationships.",
    "dataFeatureInteract": "Use this to explore how features influence each other – multiplies columns to form new features.",
    "dataFeatureStat": "Use this to create new data points based on statistical properties – e.g. mean, variance, or max.",
    "newName": "New name"
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
                el.innerText = translations[lang][key];
            }
        }
    });
}
