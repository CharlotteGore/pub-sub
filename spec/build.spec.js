describe("Pub Sub", function(){

	describe("Testing prerequisites", function(){

		it("Module has been built and evaluates properly", function(){

			expect(require).toBeDefined();
			expect(require("pub-sub")).toBeTruthy();

		})

	});

	describe("Subscribing", function(){

		var p = require('pub-sub');

		it("allows you to subscribe to a signal", function(){

			expect(p.subscribe).toBeDefined();

			p.subscribe("jasmine", function(){});

			expect(p.query().jasmine).toBe(1)

			p.subscribe("jasmine", function(){});

			expect(p.query().jasmine).toBe(2);

		});

		it("retains subscriptions across different calls to require('pub-sub')", function(){

			var b = require('pub-sub');

			expect(b.query().jasmine).toBe(2);

		});

		it("allows you to unsubscribe from a signal", function(){

			var fn = function(data){};

			p.subscribe("unsubscribe", fn);

			expect(p.query().unsubscribe).toBe(1);

			p.unsubscribe("unsubscribe", fn);

			expect(p.query().unsubscribe).toBe(0);

		});

	});

	describe("Publishing", function(){

		var p = require("pub-sub");

		it("publishs signals that are passed to subscribers", function(){

			var flag = false, data;

			runs(function(){

				p.subscribe("publish-test", function(d){ flag = true; data = d;});

				p.publish("publish-test", 42 );

			});

			waitsFor(function(){

				return flag;

			})

			runs(function(){

				expect(data).toBe(42);

			})

		})


	});

})