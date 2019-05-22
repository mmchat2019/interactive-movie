const { question } = require('./question');
const selection = require('../selections');
/**
 * 创建一个id的video
 * @param {*} node 
 */
function createVideo(id, src, container, autoplay) {
    let video = document.createElement('video');
    container.appendChild(video);
    video.src = src;
    video.id = id;
    if (autoplay) {
        video.autoplay = "autoplay";
    }
    video.style.width = '100%';
    video.playbackRate = window.__playbackRate || 1;
    return video;
}

/**
 * 隐藏video属性
 * @param {*} video 一个videoDOM标签！！！！！！！！！
 */
function hideVideo(video) {

    return ;
}

/**
 * 播放某个电影资源
 * @param src
 */
function playVideo(node) {
    if (!node) {
        node = selection['start'];
    }
    console.info('==========Current Playing=========');
    console.info(node);
    const src = node.src;
    const questionOption = node.question;
    const next = node.next;
    // 先删除div
    let container = document.querySelector('#outlet');
    if (!container) {
        container = document.createElement('div');
        container.id = "outlet";
    }
    let video = document.querySelector('#video');
    if (video) {
        // 销毁下
        const v = document.createElement('video');
        container.replaceChild(v, video);
        video = v;
    } else {
        video = document.createElement('video');
        container.appendChild(video);
    }
    video.src = src;
    video.id = "video";
    video.autoplay = "autoplay";
    video.style.width = '100%';
    video.playbackRate = window.__playbackRate || 1;
    let defaultSelectToken = undefined;
    video.onended = function () {
        if (questionOption) {
            const firstOption = questionOption[0];
            defaultSelectToken = setTimeout(() => {
                document.querySelector('#question').style.height = "0";
                playVideo(selection[firstOption.link]);
            }, 11 * 1000);

            document.querySelector('#question').style.height = window.innerHeight * 0.18 + 'px';
            const bar = document.querySelector('#bar');
            bar.style.width = '100%';
            bar.style.opacity = 1;
            setTimeout(() => {
                bar.style.width = 0;
                bar.style.opacity = 0.1;
            }, 200);
            return;
        }

        // 如果有下一个就播放下一个
        if (next) {
            playVideo(selection[next]);
            return;
        }
    };
    if (questionOption) {
        const qDiv = question(questionOption, (answer) => {
            playVideo(selection[answer.link]);
            if (defaultSelectToken !== undefined) {
                clearTimeout(defaultSelectToken);
            }
        });
        qDiv.style.height = '0';
        container.appendChild(qDiv);
    }
    //////////测试条///////////
    // setTimeout(() => {
    //     const question = document.querySelector('#question');
    //     question.style = {};
    //     question.style.height = window.innerHeight * 0.18 + 'px';
    //     const bar = document.querySelector('#bar');
    //     bar.style.width = '100%';
    //     bar.style.opacity = 1;
    //     setTimeout(() => {
    //         bar.style.width = 0;
    //         bar.style.opacity = 0.1;
    //     }, 200);
    // }, 2000);
    //////////测试条///////////
    document.body.appendChild(container);
}

module.exports = {
    playVideo
};