document.addEventListener('DOMContentLoaded', function () {
    const menuButton = document.querySelector('.site-menu-button');

    if (!menuButton) {
        return;
    }

    const navigationId = menuButton.getAttribute('aria-controls');
    const navigation = navigationId ? document.getElementById(navigationId) : null;

    if (!navigation) {
        console.error('モバイルメニューを初期化できません: aria-controlsの参照先が見つかりません。');
        return;
    }

    function setMenuState(isOpen) {
        navigation.classList.toggle('is-show', isOpen);
        menuButton.setAttribute('aria-expanded', String(isOpen));
        menuButton.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
    }

    menuButton.addEventListener('click', function () {
        setMenuState(menuButton.getAttribute('aria-expanded') !== 'true');
    });

    navigation.addEventListener('click', function (event) {
        if (event.target.closest('a')) {
            setMenuState(false);
        }
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            setMenuState(false);
        }
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth > 760) {
            setMenuState(false);
        }
    });
});
