const raw = {
    output: [],
    show: (event, dataID) => {
        raw.output.length = 0;
        // search the index of array
        tempIndex = pluto.inputData.ID.indexOf(dataID);
        // header
        raw.output.push('<h4>' + (tempIndex + 1) + ". adatsor elemei:</h4>");
        raw.output.push('<h6>Összesen ' + pluto.inputData.all[tempIndex].length + ' elem.</h6>');

        raw.output.push('<table class="numeric-simple"><tr><th>#</th><th>Értékek</th></tr>');

        // DEV: ellenőrizni!
        pluto.inputData.all[tempIndex].forEach((item, index) => {
            raw.output.push('<tr><td> ' + (index + 1) + '</td><td>' + item + '</td></tr>');
        });

        raw.output.push('</table>');
        console.log(raw.output.join(""));
        return raw.output.join("");

    }
}