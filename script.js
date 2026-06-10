// ======================================
// REEL STUDIO PRO
// PART A
// ======================================

const $ = (id) => document.getElementById(id);

// ======================================
// ELEMENTS
// ======================================

const scriptInput = $("scriptInput");

const loadScriptBtn = $("loadScriptBtn");

const captionText = $("captionText");

const captionContainer = $("captionContainer");

const counter = $("counter");

const progressBar = $("progressBar");

const prevBtn = $("prevBtn");

const nextBtn = $("nextBtn");

const playBtn = $("playBtn");

const pauseBtn = $("pauseBtn");

const textSize = $("textSize");

const fontSelect = $("fontSelect");

const captionMode = $("captionMode");

const animationMode = $("animationMode");

const captionPosition = $("captionPosition");

const autoPlay = $("autoPlay");

// ======================================
// STATE
// ======================================

let scenes = [];

let currentScene = 0;

let playTimer = null;

let tikTokTimer = null;

let playing = false;

// ======================================
// INPUT FOCUS GUARD
// ======================================

function isInputFocused()
{
    const tag =
        document.activeElement
        .tagName.toLowerCase();

    return (
        tag === "textarea" ||
        tag === "input" ||
        tag === "select"
    );
}

// ======================================
// PARSE HIGHLIGHTS
// {WORD}
// ======================================

function parseHighlights(text)
{
    return text.replace(
        /\{(.*?)\}/g,
        '<span class="highlight">$1</span>'
    );
}

// ======================================
// LOAD SCRIPT
// ======================================

function loadScript()
{
    scenes =
        scriptInput.value
        .split(/\n\s*\n/)
        .filter(
            scene =>
            scene.trim() !== ""
        );

    currentScene = 0;

    showScene();
}

// ======================================
// ANIMATION
// ======================================

function applyAnimation()
{
    captionText.classList.remove(
        "fade",
        "zoom",
        "slide",
        "bounce",
        "typewriter"
    );

    void captionText.offsetWidth;

    captionText.classList.add(
        animationMode.value
    );
}

// ======================================
// HEADLINE MODE
// ======================================

function headlineMode(text)
{
    const words =
        text.split(" ");

    const midpoint =
        Math.ceil(words.length / 2);

    const top =
        words.slice(0, midpoint).join(" ");

    const bottom =
        words.slice(midpoint).join(" ");

    return (
        "<div>" +
        top +
        "<br>" +
        bottom +
        "</div>"
    );
}

// ======================================
// SUBTITLE MODE
// ======================================

function subtitleMode(text)
{
    return text;
}

// ======================================
// TIKTOK MODE
// ======================================

function tikTokMode(text)
{
    clearInterval(
        tikTokTimer
    );

    const words =
        text.split(" ");

    let index = 0;

    captionText.innerHTML = "";

    tikTokTimer =
    setInterval(
        () =>
        {
            if(
                index >=
                words.length
            )
            {
                clearInterval(
                    tikTokTimer
                );

                return;
            }

            captionText.innerHTML =
            `<span class="highlight">${words[index]}</span>`;

            index++;

        },
        350
    );
}

// ======================================
// SHOW SCENE
// ======================================

function showScene()
{
    if(
        scenes.length === 0
    )
    {
        captionText.innerHTML =
        "No Scenes";

        return;
    }

    let text =
        parseHighlights(
            scenes[currentScene]
        );

    applyAnimation();

    switch(
        captionMode.value
    )
    {
        case "headline":

            captionText.innerHTML =
            headlineMode(text);

            break;

        case "subtitle":

            captionText.innerHTML =
            subtitleMode(text);

            break;

        case "tiktok":

            tikTokMode(
                scenes[currentScene]
            );

            break;

        default:

            captionText.innerHTML =
            subtitleMode(text);
    }

    updateCounter();

    updateProgress();
}

// ======================================
// NEXT
// ======================================

function nextScene()
{
    if(
        currentScene <
        scenes.length - 1
    )
    {
        currentScene++;

        showScene();
    }
}

// ======================================
// PREVIOUS
// ======================================

function prevScene()
{
    if(
        currentScene > 0
    )
    {
        currentScene--;

        showScene();
    }
}

// ======================================
// COUNTER
// ======================================

function updateCounter()
{
    counter.innerText =
    `${currentScene + 1}
    /
    ${scenes.length}`;
}

// ======================================
// PROGRESS
// ======================================

function updateProgress()
{
    const progress =
    (
        (currentScene + 1)
        /
        scenes.length
    ) * 100;

    progressBar.style.width =
    progress + "%";
}

// ======================================
// PLAY
// ======================================

function playScenes()
{
    stopPlayback();

    playTimer =
    setInterval(
        () =>
        {
            if(
                currentScene <
                scenes.length - 1
            )
            {
                nextScene();
            }
        },
        2500
    );
}

// ======================================
// STOP
// ======================================

function stopPlayback()
{
    clearInterval(
        playTimer
    );

    playing = false;
}

// ======================================
// FONT
// ======================================

function updateFont()
{
    captionText.style.fontFamily =
    fontSelect.value;
}

// ======================================
// SIZE
// ======================================

function updateSize()
{
    captionText.style.fontSize =
    textSize.value + "px";
}

// ======================================
// POSITION
// ======================================

function updatePosition()
{
    captionContainer.classList.remove(
        "top",
        "center",
        "bottom"
    );

    captionContainer.classList.add(
        captionPosition.value
    );
}

// ======================================
// EVENTS
// ======================================

loadScriptBtn.addEventListener(
    "click",
    loadScript
);

nextBtn.addEventListener(
    "click",
    nextScene
);

prevBtn.addEventListener(
    "click",
    prevScene
);

playBtn.addEventListener(
    "click",
    playScenes
);

pauseBtn.addEventListener(
    "click",
    stopPlayback
);

fontSelect.addEventListener(
    "change",
    updateFont
);

textSize.addEventListener(
    "input",
    updateSize
);

captionPosition.addEventListener(
    "change",
    updatePosition
);

captionMode.addEventListener(
    "change",
    showScene
);

animationMode.addEventListener(
    "change",
    showScene
);

// ======================================
// HOTKEYS
// ======================================

document.addEventListener(
    "keydown",
    (e) =>
    {
        if(isInputFocused()) return;

        if(
            e.key ===
            "ArrowRight"
        )
        {
            nextScene();
        }

        if(
            e.key ===
            "ArrowLeft"
        )
        {
            prevScene();
        }
    }
);

// ======================================
// INIT
// ======================================

loadScript();

updateFont();

updateSize();

updatePosition();

// ======================================
// PART B
// ADVANCED FEATURES
// ======================================

// --------------------------------------
// EXTRA ELEMENTS
// --------------------------------------

const backgroundMode =
$("backgroundMode");

const backgroundUpload =
$("backgroundUpload");

const backgroundLayer =
$("backgroundLayer");

const fullscreenBtn =
$("fullscreenBtn");

const recordModeBtn =
$("recordModeBtn");

const speedControl =
$("speedControl");

const showProgress =
$("showProgress");

// --------------------------------------
// LOCAL STORAGE
// --------------------------------------

function saveProject()
{
    const project =
    {
        script:
        scriptInput.value,

        mode:
        captionMode.value,

        animation:
        animationMode.value,

        font:
        fontSelect.value,

        textSize:
        textSize.value,

        position:
        captionPosition.value
    };

    localStorage.setItem(
        "reelStudioProject",
        JSON.stringify(project)
    );
}

function loadProject()
{
    const data =
    localStorage.getItem(
        "reelStudioProject"
    );

    if(!data) return;

    const project =
    JSON.parse(data);

    scriptInput.value =
    project.script || "";

    captionMode.value =
    project.mode || "subtitle";

    animationMode.value =
    project.animation || "fade";

    fontSelect.value =
    project.font || "Inter";

    textSize.value =
    project.textSize || 70;

    captionPosition.value =
    project.position || "center";
}

// --------------------------------------
// AUTOSAVE
// --------------------------------------

[
scriptInput,
captionMode,
animationMode,
fontSelect,
textSize,
captionPosition
]
.forEach(element =>
{
    element.addEventListener(
        "change",
        saveProject
    );
});

// --------------------------------------
// SPEED CONTROL
// --------------------------------------

function getSpeed()
{
    return (
        Number(
            speedControl.value
        ) * 1000
    );
}

// --------------------------------------
// IMPROVED PLAY
// --------------------------------------

function playScenes()
{
    stopPlayback();

    playing = true;

    playTimer =
    setInterval(
        () =>
        {
            if(
                currentScene <
                scenes.length - 1
            )
            {
                nextScene();
            }
            else
            {
                stopPlayback();
            }
        },
        getSpeed()
    );
}

// --------------------------------------
// BACKGROUND SYSTEM
// --------------------------------------

function setBlackBackground()
{
    backgroundLayer.innerHTML = "";

    backgroundLayer.className = "";
}

function setGradientBackground()
{
    backgroundLayer.innerHTML = "";

    backgroundLayer.className =
    "gradient-bg";
}

// --------------------------------------
// FILE UPLOAD
// --------------------------------------

backgroundUpload
.addEventListener(
"change",
(e)=>
{
    const file =
    e.target.files[0];

    if(!file) return;

    const url =
    URL.createObjectURL(file);

    if(
        file.type.startsWith(
            "image"
        )
    )
    {
        backgroundLayer.innerHTML =
        `
        <img
        src="${url}"
        alt=""
        >
        `;
    }

    if(
        file.type.startsWith(
            "video"
        )
    )
    {
        backgroundLayer.innerHTML =
        `
        <video
            autoplay
            muted
            loop
            playsinline
        >
            <source
            src="${url}">
        </video>
        `;
    }
}
);

// --------------------------------------
// BACKGROUND MODE
// --------------------------------------

backgroundMode
.addEventListener(
"change",
() =>
{
    switch(
        backgroundMode.value
    )
    {
        case "black":

            setBlackBackground();

            break;

        case "gradient":

            setGradientBackground();

            break;
    }
}
);

// --------------------------------------
// PROGRESS TOGGLE
// --------------------------------------

showProgress
.addEventListener(
"change",
() =>
{
    progressBar.style.display =
    showProgress.checked
    ? "block"
    : "none";
}
);

// --------------------------------------
// RECORD MODE
// --------------------------------------

recordModeBtn
.addEventListener(
"click",
() =>
{
    document.body
    .classList.toggle(
        "recording"
    );
}
);

// --------------------------------------
// FULLSCREEN
// --------------------------------------

fullscreenBtn
.addEventListener(
"click",
() =>
{
    const reel =
    document.querySelector(
        ".phone-frame"
    );

    if(
        reel.requestFullscreen
    )
    {
        reel.requestFullscreen();
    }
}
);

// --------------------------------------
// TELEPROMPTER
// --------------------------------------

let teleprompterTimer =
null;

function startTeleprompter()
{
    clearInterval(
        teleprompterTimer
    );

    const text =
    scenes.join("<br><br>");

    captionText.innerHTML =
    `
    <div id="teleprompterContent">
        ${text}
    </div>
    `;

    const content =
    document.getElementById(
        "teleprompterContent"
    );

    let position = 100;

    teleprompterTimer =
    setInterval(
        () =>
        {
            position -= 1;

            content.style.transform =
            `translateY(${position}px)`;
        },
        40
    );
}

// --------------------------------------
// OVERRIDE SHOWSCENE
// --------------------------------------

const oldShowScene =
showScene;

showScene =
function()
{
    // Clear stale timers
    clearInterval(tikTokTimer);
    clearInterval(teleprompterTimer);

    if(
        captionMode.value
        ===
        "teleprompter"
    )
    {
        startTeleprompter();

        return;
    }

    oldShowScene();
};

// --------------------------------------
// EXTRA HOTKEYS
// --------------------------------------

document.addEventListener(
"keydown",
(e)=>
{
    if(isInputFocused()) return;

    const key =
    e.key.toLowerCase();

    if(key === "f")
    {
        fullscreenBtn.click();
    }

    if(key === "h")
    {
        recordModeBtn.click();
    }

    if(key === "p")
    {
        playBtn.click();
    }

    if(key === "s")
    {
        pauseBtn.click();
    }
}
);

// --------------------------------------
// INITIALIZE
// --------------------------------------

loadProject();

loadScript();

updateFont();

updateSize();

updatePosition();

saveProject();

// ======================================
// PART C
// REEL CREATOR PRO
// ======================================

// --------------------------------------
// CAPTION PRESETS
// --------------------------------------

const captionPresets = {

    coding: {
        font: "Montserrat",
        size: 78,
        animation: "zoom"
    },

    hormozi: {
        font: "Bebas Neue",
        size: 95,
        animation: "bounce"
    },

    minimal: {
        font: "Inter",
        size: 65,
        animation: "fade"
    },

    cinematic: {
        font: "Poppins",
        size: 85,
        animation: "slide"
    }

};

// --------------------------------------
// APPLY PRESET
// --------------------------------------

function applyPreset(name)
{
    const preset =
    captionPresets[name];

    if(!preset) return;

    fontSelect.value =
    preset.font;

    textSize.value =
    preset.size;

    animationMode.value =
    preset.animation;

    updateFont();

    updateSize();

    showScene();
}

// --------------------------------------
// DYNAMIC HIGHLIGHT
// --------------------------------------

function animateHighlight()
{
    const highlights =
    document.querySelectorAll(
        ".highlight"
    );

    highlights.forEach(
        word =>
        {
            word.animate(
            [
                {
                    transform:
                    "scale(1)"
                },
                {
                    transform:
                    "scale(1.2)"
                },
                {
                    transform:
                    "scale(1)"
                }
            ],
            {
                duration:900
            });
        }
    );
}

// --------------------------------------
// ENHANCED TIKTOK MODE
// --------------------------------------

function enhancedTikTokMode(text)
{
    clearInterval(
        tikTokTimer
    );

    const words =
    text.split(" ");

    let index = 0;

    tikTokTimer =
    setInterval(
        () =>
        {
            if(
                index >=
                words.length
            )
            {
                clearInterval(
                    tikTokTimer
                );

                return;
            }

            const current =
            words
            .map(
            (
            word,
            i
            ) =>
            {
                if(i === index)
                {
                    return `
                    <span class="highlight">
                        ${word}
                    </span>
                    `;
                }

                return word;
            })
            .join(" ");

            captionText.innerHTML =
            current;

            animateHighlight();

            index++;

        },
        350
    );
}

// --------------------------------------
// OVERRIDE TIKTOK
// --------------------------------------

const oldTikTok =
tikTokMode;

tikTokMode =
function(text)
{
    enhancedTikTokMode(
        text
    );
};

// --------------------------------------
// RANDOM GRADIENTS
// --------------------------------------

const gradients =
[
"linear-gradient(180deg,#000,#111,#000)",
"linear-gradient(180deg,#0f172a,#020617)",
"linear-gradient(180deg,#1e1b4b,#000)",
"linear-gradient(180deg,#052e16,#000)",
"linear-gradient(180deg,#3f0d12,#000)"
];

function randomGradient()
{
    const random =
    gradients[
        Math.floor(
            Math.random() *
            gradients.length
        )
    ];

    backgroundLayer.style.background =
    random;
}

// --------------------------------------
// SCENE TIMELINE
// --------------------------------------

function jumpToScene(index)
{
    if(
        index < 0
        ||
        index >= scenes.length
    )
    {
        return;
    }

    currentScene = index;

    showScene();
}

// --------------------------------------
// PROJECT EXPORT
// --------------------------------------

function exportProject()
{
    const project =
    {
        script:
        scriptInput.value,

        mode:
        captionMode.value,

        font:
        fontSelect.value,

        size:
        textSize.value,

        animation:
        animationMode.value
    };

    const blob =
    new Blob(
    [
        JSON.stringify(
            project,
            null,
            2
        )
    ],
    {
        type:
        "application/json"
    });

    const link =
    document.createElement(
        "a"
    );

    link.href =
    URL.createObjectURL(
        blob
    );

    link.download =
    "reel-project.json";

    link.click();
}

// --------------------------------------
// IMPORT PROJECT
// --------------------------------------

function importProject(file)
{
    const reader =
    new FileReader();

    reader.onload =
    function(event)
    {
        const data =
        JSON.parse(
            event.target.result
        );

        scriptInput.value =
        data.script;

        captionMode.value =
        data.mode;

        fontSelect.value =
        data.font;

        textSize.value =
        data.size;

        animationMode.value =
        data.animation;

        loadScript();

        updateFont();

        updateSize();

        showScene();
    };

    reader.readAsText(
        file
    );
}

// --------------------------------------
// AUTO RANDOM BG
// --------------------------------------

setInterval(
() =>
{
    if(
        backgroundMode.value
        ===
        "gradient"
    )
    {
        randomGradient();
    }
},
8000
);

// --------------------------------------
// SPACE PLAY/PAUSE
// --------------------------------------

document.addEventListener(
"keydown",
(e)=>
{
    if(isInputFocused()) return;

    if(
        e.code
        ===
        "Space"
    )
    {
        e.preventDefault();

        if(!playing)
        {
            playScenes();
        }
        else
        {
            stopPlayback();
        }
    }
}
);

// --------------------------------------
// REEL SHORTCUTS
// --------------------------------------

document.addEventListener(
"keydown",
(e)=>
{
    if(isInputFocused()) return;

    if(e.key === "1")
    {
        applyPreset(
            "coding"
        );
    }

    if(e.key === "2")
    {
        applyPreset(
            "hormozi"
        );
    }

    if(e.key === "3")
    {
        applyPreset(
            "minimal"
        );
    }

    if(e.key === "4")
    {
        applyPreset(
            "cinematic"
        );
    }
}
);

// --------------------------------------
// FIRST LOAD
// --------------------------------------

showScene();

// ======================================
// PART D
// FRAME, STUDIO LIGHT, 3D CONTROLS
// ======================================

// --------------------------------------
// FRAME DIMENSION CONTROLS
// --------------------------------------

const phoneFrame = $("phoneFrame");
const frameWidth = $("frameWidth");
const frameHeight = $("frameHeight");
const frameRadius = $("frameRadius");
const frameWidthVal = $("frameWidthVal");
const frameHeightVal = $("frameHeightVal");
const frameRadiusVal = $("frameRadiusVal");

function updateFrameDimensions()
{
    const w = frameWidth.value;
    const h = frameHeight.value;
    const r = frameRadius.value;

    phoneFrame.style.width = w + "px";
    phoneFrame.style.height = h + "px";
    phoneFrame.style.borderRadius = r + "px";

    frameWidthVal.textContent = w + "px";
    frameHeightVal.textContent = h + "px";
    frameRadiusVal.textContent = r + "px";

    // Update the glow ring border-radius
    const glowR = parseInt(r) + 3;
    phoneFrame.style.setProperty("--glow-radius", glowR + "px");
}

frameWidth.addEventListener("input", updateFrameDimensions);
frameHeight.addEventListener("input", updateFrameDimensions);
frameRadius.addEventListener("input", updateFrameDimensions);

// --------------------------------------
// 3D TOGGLE
// --------------------------------------

const enable3D = $("enable3D");
const stage3d = document.querySelector(".stage-3d");

function toggle3D()
{
    if(enable3D.checked)
    {
        stage3d.style.animation = "";
        stage3d.style.transform = "";
        document.querySelector(".workspace").style.perspective = "2000px";
    }
    else
    {
        stage3d.style.animation = "none";
        stage3d.style.transform = "none";
        document.querySelector(".workspace").style.perspective = "none";
    }
}

enable3D.addEventListener("change", toggle3D);

// --------------------------------------
// INIT NEW CONTROLS
// --------------------------------------

updateFrameDimensions();
toggle3D();

