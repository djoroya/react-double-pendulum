
import {useRef,useEffect} from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
const Model3D = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const currentRef = mountRef.current;
        const { clientWidth: width, clientHeight: height } = currentRef;

        const scene  = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(25, width / height, 0.1, 1000);
        scene.add(camera);

        camera.position.x = 5;
        camera.position.z = 5;


        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height);
        currentRef.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
        camera.lookAt(cube.position);

        const light = new THREE.PointLight(0x404040,15); // soft white light
        light.position.set(10, 10, 10);
        scene.add(light);

        const ambientLight = new THREE.AmbientLight(0x404040,5);
        scene.add(ambientLight);
        const animate = () => {
            cube.rotation.x += 0.01;
            controls.update();
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        }

        window.addEventListener('resize', () => {
            const { clientWidth: width, clientHeight: height } = currentRef;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        });
        animate();

        
        renderer.render(scene, camera);

        return () => {
            currentRef.removeChild(renderer.domElement);
        }

    }, []);

    return <div ref={mountRef} style={{width:"100%",height:"100vh"}}></div>     
}

export default Model3D;
