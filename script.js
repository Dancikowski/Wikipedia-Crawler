function getResult(content, begin, finish) {
    const reg1 = /==/;
    const reg2 = /\*+\'*\s*\[*\[*/g;
    const reg3 = /\]+/g;
    const reg4 = /\<.+[\sA-z'-]+\>/g;
    const reg5 = /\{+.+/g
    const reg6 = /[\:\,\|\;|\(].+/gm;
    const reg7 = /\[.+/gm;
    const reg8 = /\=+.+/gm;
    const reg9 = /^\s/mg;


    return content.substring(begin, finish - 5).replace(reg1, "").replace(reg2, "").replace(reg3, "").replace(reg4, "").replace(reg5, "").replace(reg6, "").replace(reg7, "").replace(reg8, "").replace(reg9, "");
}

function getNewUrl(text) {
    text.shift();
    let arr = [];

    arr = text.filter(function (el) {

        return el != "";
    })


    return arr.map(function (el) {

        return el.split(' ').join('_');
    })

}

document.querySelector('#start').addEventListener('click', function () {


    const input = document.getElementsByTagName('textarea')[0].value.split(' ').join('_');


    const start = function (inp) {
        //console.log(inp);
        //console.log(inp);
        $(document).ready(function () {

            const url = 'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&callback=?&titles=' + inp;

            // console.log(url);

            $.getJSON(url, function (jd) {
                const id = Object.keys(jd.query.pages)[0];


                if (id != -1) {


                    let page = jd.query.pages;

                    let content = page[id].revisions[0]['*'];



                    if (content.lastIndexOf('See also') != -1) {
                        content = content.substr(content.lastIndexOf('See also'));

                        //console.log(content.substr(10));
                        let beginIndex = content.lastIndexOf('See also');


                        //console.log(beginIndex);
                        const finishIndex = content.substr(10).indexOf('\n==');


                        let result = getResult(content, beginIndex, finishIndex + 12);
                        console.log(result);

                        let newUrl = getNewUrl(result.split('\n'));
                        console.log(newUrl);
                        //debugger;


                        [].forEach.call(newUrl, function (el) {



                            setTimeout(start.bind(null, el), 3000);

                        });

                    }
                } else return false;
            });


        });
    }

    start(input);


});
