

// ページの読み込みを待つ
window.addEventListener('load', init);

function init() {

    // サイズを指定
    const width = window.innerWidth;
    const height = window.innerHeight;

    // レンダラーを作成
    const canvasElement = document.querySelector('#myCanvas');
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#myCanvas')
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.gammaOutput = true;

    // シーンを作成
    const scene = new THREE.Scene();

    // カメラ関連を作成
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 500);
    camera.position.set(9, 6, 11);
    //コントローラー
    const controls = new THREE.OrbitControls(camera, canvasElement);
    //制御
    controls.enableDamping = true;
    controls.dampingFactor = 0.2;

    // ライトを作成
    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    // 環境光を追加
    const ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(ambientLight);

    //モデルを読み込み
    const gltfLoader = new THREE.GLTFLoader();
    const url = 'src/models/desk.gltf';
    gltfLoader.load(url, function (data) {
        const gltf = data;
        const root = gltf.scene;
        scene.add(root);
    });

    // 初回の実行
    tick();
    
    function tick() {
        renderer.render(scene, camera);
        requestAnimationFrame(tick);
    }

    onResize();
    window.addEventListener('resize', onResize);

    function onResize() {
        const reWidth = document.getElementById('myCanvas').getBoundingClientRect().width;
        const reHeight = document.getElementById('myCanvas').getBoundingClientRect().height;

        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(reWidth, reHeight);

        camera.aspect = reWidth / reHeight;
        camera.updateProjectionMatrix();
    }

}