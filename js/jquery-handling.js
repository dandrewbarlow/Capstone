let content = $("#content");

let returnButtonString = '<button id="return" onClick="clearContent()">Return to Visual</button>';

let returnButton = $('#return');

$("#about").on("click", () =>{
    content.html( returnButtonString + 
    `
    <p id="information">
        <em>Emitting</em> is an immersive art installation utilizing projection mapping and interactive design to explore loneliness and isolation. It is being made by Andrew Barlow, Madi Heath, Phu Le, and Sofi Ozambela as their Creative Technology and Design Capstone Project.
    </p>
    `
    );
});

$("#when").on("click", () => {
    content.html( returnButtonString + 
    `
    <p id="information">
        Emitting will be open to the public on November 19th & 20th, with a special opening at 5pm on the 19th, in The Black Box Experimental Studio, located in the second basement level of <a href="https://map.concept3d.com/?id=336#!m/193967">CU Boulder's Roser Atlas building</a>.
    </p>
    `
    )
});

function clearContent() {
    content.html("");
}