console.log('Script loaded');

// Init Stats
var stats = new Stats();
stats.setMode(0);
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';
document.body.appendChild(stats.domElement);

(function ($, window) {
    var $window = $(window);

    function Constellation (canvas, options) {
        var $canvas = $(canvas),
            context = canvas.getContext('2d'),
            defaults = {
                star: {
                    color: 'rgba(255, 255, 255, .8)',
                    width: 3
                },
                line: {
                    color: 'rgba(255, 255, 255, .2)',
                    width: 0.5
                },
                position: {
                    x: 0,
                    y: 0
                },
                width: window.innerWidth,
                height: window.innerHeight,
                velocity: 0.1,
                length: 100,
                distance: 120,
                radius: 150,
                stars: []
            },
            config = $.extend(true, {}, defaults, options);

        function Star () {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;

            this.vx = (config.velocity - (Math.random() * 0.5));
            this.vy = (config.velocity - (Math.random() * 0.5));

            this.radius = config.star.width;
        }

        Star.prototype = {
            create: function(){
                context.beginPath();
                context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
                context.fill();
            },

            animate: function(){
                var i;
                for (i = 0; i < config.length; i++) {

                    var star = config.stars[i];

                    if (star.y < 0 || star.y > canvas.height) {
                        star.vx = star.vx;
                        star.vy = - star.vy;
                    } else if (star.x < 0 || star.x > canvas.width) {
                        star.vx = - star.vx;
                        star.vy = star.vy;
                    }

                    star.x += star.vx;
                    star.y += star.vy;
                }
            },

            line: function(){
                var length = config.length,
                    iStar,
                    jStar,
                    i,
                    j;

                for (i = 0; i < length; i++) {
                    for (j = 0; j < length; j++) {
                        iStar = config.stars[i];
                        jStar = config.stars[j];

                        if (
                            (iStar.x - jStar.x) < config.distance &&
                            (iStar.y - jStar.y) < config.distance &&
                            (iStar.x - jStar.x) > - config.distance &&
                            (iStar.y - jStar.y) > - config.distance
                        ) {
                            if (
                                (iStar.x - config.position.x) < config.radius &&
                                (iStar.y - config.position.y) < config.radius &&
                                (iStar.x - config.position.x) > - config.radius &&
                                (iStar.y - config.position.y) > - config.radius
                            ) {
                                context.beginPath();
                                context.moveTo(iStar.x, iStar.y);
                                context.lineTo(jStar.x, jStar.y);
                                context.stroke();
                                context.closePath();
                            }
                        }
                    }
                }
            }
        };

        this.createStars = function () {
            var length = config.length,
                star,
                i;

            context.clearRect(0, 0, canvas.width, canvas.height);

            for (i = 0; i < length; i++) {
                config.stars.push(new Star());
                star = config.stars[i];

                star.create();
            }

            star.line();
            star.animate();
        };

        this.setCanvas = function () {
            canvas.width = config.width;
            canvas.height = config.height;
        };

        this.setContext = function () {
            context.fillStyle = config.star.color;
            context.strokeStyle = config.line.color;
            context.lineWidth = config.line.width;
        };

        this.setInitialPosition = function () {
            if (!options || !options.hasOwnProperty('position')) {
                config.position = {
                    x: canvas.width * 0.5,
                    y: canvas.height * 0.5
                };
            }
        };

        this.loop = function (callback) {
            callback();

            this.rAF = window.requestAnimationFrame(function () {
                stats.begin();
                this.loop(callback);
                stats.end();
            }.bind(this));
        };

        this.handlers = {
            window: {
                mousemove: function(e){
                    config.position.x = e.pageX - $canvas.offset().left;
                    config.position.y = e.pageY - $canvas.offset().top;
                },
                resize: function () {
                    window.cancelAnimationFrame(this.rAF);
                }
            }
        };

        this.bind = function () {
            $window
                .on('mousemove', this.handlers.window.mousemove)
                .on('resize', this.handlers.window.resize.bind(this));
        };

        this.unbind = function () {
            $window
                .off('mousemove', this.handlers.window.mousemove)
                .off('resize', this.handlers.window.resize);
        }

        this.init = function () {
            this.setCanvas();
            this.setContext();
            this.setInitialPosition();
            this.loop(this.createStars);
            this.bind();
        };
    }

    function instantiate(element, options) {
        var c = new Constellation(element, options);
        c.init();
    }

    $.fn.constellation = function (options) {
        return this.each(function () {
            $window.on('resize', () => {
                instantiate(this, options);
            });

            instantiate(this, options);
        });
    };
})($, window);

// Init plugin
function initConstellation() {
    $('canvas').constellation({
        star: {
            width: 1,
            color: 'rgba(255, 255, 255, .8)'
        },
        line: {
            color: 'rgba(255, 255, 255, .2)',
            width: 0.5
        },
        length: Math.round(window.innerWidth / 10),
        radius: Math.round(window.innerWidth / 5)
    });
}

// Initial call
initConstellation();

// Reinitialize on window resize
$(window).on('resize', function() {
    initConstellation();
});