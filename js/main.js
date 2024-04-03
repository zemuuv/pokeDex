var artyom;
$(document).ready(function () {

    $("#boton").on("click", function () {
        var pokemonName = $("#txt-buscar").val();
        if (!pokemonName) {
            alert("Por favor, ingrese un nombre de Pokémon.");
            return;
        }

        $.ajax({
            url: "https://pokeapi.co/api/v2/pokemon/" + pokemonName.toLowerCase(),
            type: "GET",
            contentType: "application/json",
            success: function (data) {
                console.log(data.sprites.other.home.front_default);
                $("#imagen_pokemon").html(`<img src="${data.sprites.other.home.front_default}">`);

                var habilidades = data.abilities.map(function (habilidad) {
                    return habilidad.ability.name;
                }).join(', ');
                var tipo = data.types.map(function (tipo) {
                    return tipo.type.name;
                }).join(', ');
                var movimientos = data.moves.map(function (movimiento) {
                    return movimiento.move.name;
                }).join(', ');
                $("#ficha_tecnica").html(`
                   <div class="blue-box">
                      <p>Nombre: ${data.name} </p>
                   </div>
                   <div class="blue-box">
                     <p>Número de Pokédex:${data.id} </p>
                   </div>
                   <div class="blue-box">
                     <p>Habilidades: ${habilidades}</p>
                  </div>
                  <div class="blue-box">
                     <p>Tipo: ${tipo}</p>
                  </div>
                 <div class="blue-box">
                    <p>Movimientos:${movimientos} </p>
                 </div>
                `);
            },
            error: function (xhr, status, error) {
                if (xhr.status === 404) {
                    alert("El Pokémon buscado no se encuentra en la PokeAPI. Por favor, ingrese otro nombre.");
                } else {
                    alert("Se produjo un error al buscar el Pokémon. Por favor, inténtelo de nuevo más tarde.");
                }
            }
        });
    });

    
   
    $("#activar-voz").on("click", function () {
        artyom = new Artyom();

        artyom.addCommands({
            indexes: ["Hola", "adios", "comando"],
            action: function (i) {
                if (i == 0) {
                    artyom.say("saludo");
                } else if (i == 1) {
                    artyom.say("chao");
                } else if (i == 2) {
                    console.log("recibido");
                }
            }
        });

        artyom.initialize({
            lang: "es-ES",
            debug: true,
            listen: true,
            continuous: true,
            speed: 0.9,
            mode: "normal"
        });

        // Agregar el evento para el texto reconocido
        artyom.redirectRecognizedTextOutput(function (recognized, isFinal) {
            if (isFinal) {
                console.log("Texto final reconocido: " + recognized);
            } else {
                console.log(recognized);
            }
        });

        // Informar al usuario que Artyom está listo
        artyom.say("Artyom está listo para escuchar.");
    });
});

