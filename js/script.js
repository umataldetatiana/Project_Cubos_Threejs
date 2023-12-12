import * as THREE from 'three';
import { SVGLoader } from '/js/js/three/SVGLoader.js';

// Cria um novo objeto de cena
var scene = new THREE.Scene();

// Cria uma câmera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Cria um renderizador
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Cria um carregador SVG
var loader = new SVGLoader();

// Armazena todas as partículas
var particles = [];

// Carrega o SVG
loader.load('svg/Coracion.svg', function(data) {

    var group = new THREE.Group();
    var paths = data.paths;

    for (var i = 0; i < paths.length; i++) {

        var path = paths[i];

        var material = new THREE.PointsMaterial({
            color: 0xff0000,  // Cor fixa para teste
            size: 0.1  // Tamanho maior para teste
        });

        var shapes = path.toShapes(true);

        for (var j = 0; j < shapes.length; j++) {

            var shape = shapes[j];

            // Cria um array para armazenar as posições das partículas
            var positions = [];

            // Loop através de cada ponto na forma
            for (var k = 0; k < shape.getPoints().length; k++) {
                var point = shape.getPoints()[k];

                // Adiciona a posição do ponto ao array de posições
                positions.push(point.x, point.y, point.z || 0);
            }

            // Cria uma nova BufferGeometry
            var geometry = new THREE.BufferGeometry();

            // Adiciona o array de posições como um atributo à geometria
            geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

            var particle = new THREE.Points(geometry, material);

            // Adiciona uma velocidade aleatória a cada partícula
            particle.velocity = new THREE.Vector3(
                (Math.random() - 0.5) * 0.7, // x
                (Math.random() - 0.5) * 0.3, // y
                (Math.random() - 0.5) * 0.2  // z
            );
            particles.push(particle);

            group.add(particle);
        }
    }

    // Adicione o grupo à sua cena
    scene.add(group);
});

// Animação
function animate() {
    requestAnimationFrame(animate);

    // Atualiza a posição de cada partícula
    for (var i = 0; i < particles.length; i++) {
        particles[i].position.add(particles[i].velocity);
        particles[i].geometry.attributes.position.needsUpdate = true;
    }

    renderer.render(scene, camera);
}
animate();