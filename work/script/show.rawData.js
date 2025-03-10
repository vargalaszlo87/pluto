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
            raw.output.push('<tr><td> ' + (index + 1) + '</td><td>' + item + '<button class="buttonItemDelete"><i class="fa fa-1x fa-trash"></i></button><button class="buttonItemUpdate"><i class="fa fa-1x fa-pencil"></i></button></td></tr>');
        });

        raw.output.push('</table>');
        return raw.output.join("");

    }
}