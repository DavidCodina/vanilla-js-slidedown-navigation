(function(){
  const toggleButton = document.getElementById('toggle-button');
  let wasOpen        = false;
  let previousHeight;


  /* ===========================================================================
                                openNavigation
  =========================================================================== */
  //Assign openNavigation to an IIFE that remembers the value of isOpening.


  const openNavigation = (function(navigation){
    let isOpening = false;
    return function(){
      if (isOpening) { return; }
      isOpening = true;
      document.body.classList.add('navigation-open');
      navigation.style.height = 'auto';
      const height = navigation.offsetHeight + 'px';
      navigation.style.height = '0px';

      //Force reflow: (old skool)
      setTimeout(() => {navigation.style.height = height; }, 0);

      //Alternative:
      //The fact that we are using offsetWidth is arbitrary.
      //We could also use offsetHeight, clientWidth, etc.
      //void navigation.offsetWidth;
      //navigation.style.height = height;

      isOpening = false;
    }
  })(document.getElementById('primary-navigation'));


  /* ===========================================================================
                                closeNavigation
  =========================================================================== */
  //Assign closeNavigation to an IIFE that remembers the value of isClosing.


  const closeNavigation = (function(navigation){
    let isClosing = false;
    return function(){
      if (isClosing) { return; }
      isClosing = true;
    	navigation.style.height = '0px';
    	navigation.addEventListener('transitionend', function(){
    		document.body.classList.remove('navigation-open');
        isClosing = false;
    	}, {once: true});
    };
  })(document.getElementById('primary-navigation'));



  /* ===========================================================================
                        Event Listeners
  =========================================================================== */


  toggleButton.addEventListener('click', function(){
    const primaryNavigation = document.getElementById('primary-navigation');
    if (!document.body.classList.contains('navigation-open')) {
      if (window.innerWidth < 992){ wasOpen = true; }
        openNavigation();
    } else {
      if (window.innerWidth < 992){ wasOpen = false; }
      closeNavigation();
    }
  });


  window.onresize = function(){
    const primaryNavigation = document.getElementById('primary-navigation');

    if (window.innerWidth >= 992) {
      document.body.classList.add('navigation-open');
      primaryNavigation.style.height = 'auto';
    } else if (window.innerWidth < 992 && wasOpen) {
      previousHeight = primaryNavigation.offsetHeight + 'px';
      setTimeout(() => {primaryNavigation.style.height = previousHeight; }, 0);
    } else {
      document.body.classList.remove('navigation-open');
      primaryNavigation.style.height = '0px';
    }
  };
})();
