// Importando o módulo THREE.js
import * as THREE from 'https://threejs.org/build/three.module.js';

// Definindo constantes para a cena, câmera e cubo
const SCENE_WIDTH = 800; // Largura da cena
const SCENE_HEIGHT = 600; // Altura da cena
const CAMERA_FIELD_OF_VIEW = 75; // Campo de visão da câmera
const CAMERA_POSITION_Z = 5; // Posição da câmera no eixo Z

// Função para criar a cena
function createScene() {
    // Cria uma nova cena
    const scene = new THREE.Scene();
    return scene; // Retorna a cena criada
}

// Função para criar a câmera
function createCamera() {
    // Calcula a proporção da cena
    const aspectRatio = SCENE_WIDTH / SCENE_HEIGHT;
    // Cria uma nova câmera perspectiva
    const camera = new THREE.PerspectiveCamera(CAMERA_FIELD_OF_VIEW, aspectRatio, 0.1, 100);
    // Define a posição da câmera no eixo Z
    camera.position.z = CAMERA_POSITION_Z;
    return camera; // Retorna a câmera criada
}

// Função para criar o renderizador
function createRenderer() {
    // Cria um novo renderizador WebGL
    const renderer = new THREE.WebGLRenderer();
    // Define o tamanho do renderizador
    renderer.setSize(SCENE_WIDTH, SCENE_HEIGHT);
    // Adiciona o elemento do renderizador ao corpo do documento
    document.body.appendChild(renderer.domElement);
    return renderer; // Retorna o renderizador criado
}

// Função principal
function main() {
    // Cria a cena
    const scene = createScene();
    // Cria a câmera
    const camera = createCamera();

    // Cria o AxesHelper
    const axesHelper = new THREE.AxesHelper(2);
    scene.add(axesHelper); // Adiciona o AxesHelper à cena

    // Cria um grupo
    const group = new THREE.Group();
    group.rotation.y = 0.2; // Define a rotação do grupo no eixo Y
    scene.add(group); // Adiciona o grupo à cena

    // Cria o primeiro cubo
    const cube1 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1), // Define a geometria do cubo
        new THREE.MeshBasicMaterial({ color: 0xff0000 }) // Define o material do cubo
    );
    cube1.position.x = -1.5; // Define a posição do cubo no eixo X
    group.add(cube1); // Adiciona o cubo ao grupo

    // Cria o segundo cubo
    const cube2 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1), // Define a geometria do cubo
        new THREE.MeshBasicMaterial({ color: 0xff0000 }) // Define o material do cubo
    );
    cube2.position.x = 0; // Define a posição do cubo no eixo X
    group.add(cube2); // Adiciona o cubo ao grupo

    // Cria o terceiro cubo
    const cube3 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1), // Define a geometria do cubo
        new THREE.MeshBasicMaterial({ color: 0xff0000 }) // Define o material do cubo
    );
    cube3.position.x = 1.5; // Define a posição do cubo no eixo X
    group.add(cube3); // Adiciona o cubo ao grupo

    // Cria o renderizador
    const renderer = createRenderer();

    // Faz a câmera olhar para a posição do grupo
    camera.lookAt(group.position);

    // Função de animação
    function animate() {
        // Move os cubos em direção ao centro
        if (cube1.position.x < -0.1) cube1.position.x += 0.01;
        if (cube3.position.x > 0.1) cube3.position.x -= 0.01;

        // Renderiza a cena
        renderer.render(scene, camera);

        // Solicita o próximo quadro de animação
        requestAnimationFrame(animate);
    }

    // Inicia a animação
    animate();
}

// Chama a função principal
main();