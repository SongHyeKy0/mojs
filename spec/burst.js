(function() {
  var Burst, Transit;

  Transit = mojs.Transit;

  Burst = mojs.Burst;

  describe('Byte ->', function() {
    describe('extension ->', function() {
      it('should extend Transit class', function() {
        var burst;
        burst = new Burst;
        return expect(burst instanceof Transit).toBe(true);
      });
      return it('should have its own defaults', function() {
        var burst;
        burst = new Burst;
        expect(burst.defaults.burstDegree).toBe(360);
        expect(burst.defaults.burstPoints).toBe(5);
        return expect(burst.defaults.burstRadius[50]).toBe(75);
      });
    });
    describe('initialization ->', function() {
      it('should create transits', function() {
        var burst;
        burst = new Burst;
        expect(burst.transits.length).toBe(5);
        return expect(burst.transits[0] instanceof Transit).toBe(true);
      });
      return it('should pass properties to transits', function() {
        var burst;
        burst = new Burst({
          radius: [
            {
              20: 50
            }, 20, '500'
          ],
          stroke: ['deeppink', 'yellow'],
          fill: '#fff'
        });
        expect(burst.transits[0].o.radius[20]).toBe(50);
        expect(burst.transits[1].o.radius).toBe(20);
        expect(burst.transits[2].o.radius).toBe('500');
        expect(burst.transits[3].o.radius[20]).toBe(50);
        expect(burst.transits[4].o.radius).toBe(20);
        expect(burst.transits[1].o.stroke).toBe('yellow');
        expect(burst.transits[2].o.stroke).toBe('deeppink');
        expect(burst.transits[1].o.fill).toBe('#fff');
        return expect(burst.transits[2].o.fill).toBe('#fff');
      });
    });
    describe('getOption method ->', function() {
      return it('should return an option obj based on i ->', function() {
        var burst, option0, option1, option7;
        burst = new Burst({
          radius: [
            {
              20: 50
            }, 20, '500'
          ]
        });
        option0 = burst.getOption(0);
        option1 = burst.getOption(1);
        option7 = burst.getOption(7);
        expect(option0.radius[20]).toBe(50);
        expect(option1.radius).toBe(20);
        return expect(option7.radius).toBe(20);
      });
    });
    describe('getPropByMod method ->', function() {
      it('should return the prop from @o based on i ->', function() {
        var burst, opt0, opt1, opt8;
        burst = new Burst({
          radius: [
            {
              20: 50
            }, 20, '500'
          ]
        });
        opt0 = burst.getPropByMod('radius', 0);
        opt1 = burst.getPropByMod('radius', 1);
        opt8 = burst.getPropByMod('radius', 8);
        expect(opt0[20]).toBe(50);
        expect(opt1).toBe(20);
        return expect(opt8).toBe('500');
      });
      return it('should the same prop if not an array ->', function() {
        var burst, opt0, opt1, opt8;
        burst = new Burst({
          radius: 20
        });
        opt0 = burst.getPropByMod('radius', 0);
        opt1 = burst.getPropByMod('radius', 1);
        opt8 = burst.getPropByMod('radius', 8);
        expect(opt0).toBe(20);
        expect(opt1).toBe(20);
        return expect(opt8).toBe(20);
      });
    });
    describe('size calculations ->', function() {
      it('should calculate size based on largest transit + self radius', function() {
        var burst;
        burst = new Burst({
          radius: [
            {
              20: 50
            }, 20
          ],
          strokeWidth: 20
        });
        expect(burst.props.size).toBe(220);
        return expect(burst.props.center).toBe(110);
      });
      return it('should work with numeric burstRadius', function() {
        var burst;
        burst = new Burst({
          burstRadius: '100',
          radius: [
            {
              20: 50
            }, 20
          ],
          strokeWidth: 20
        });
        expect(burst.props.size).toBe(270);
        return expect(burst.props.center).toBe(135);
      });
    });
    return describe('setProgress method ->', function() {
      it('should setProgress on all transits', function() {
        var burst;
        burst = new Burst({
          radius: [
            {
              20: 50
            }, 20
          ],
          strokeWidth: 20
        });
        burst.setProgress(.5);
        expect(burst.transits[0].progress).toBe(.5);
        expect(burst.transits[1].progress).toBe(.5);
        expect(burst.transits[2].progress).toBe(.5);
        expect(burst.transits[3].progress).toBe(.5);
        return expect(burst.transits[4].progress).toBe(.5);
      });
      return it('should call super method', function() {
        var burst, isOnUpdate;
        isOnUpdate = false;
        burst = new Burst({
          radius: [
            {
              20: 50
            }, 20
          ]
        });
        spyOn(Burst.__super__, 'setProgress');
        burst.setProgress(.5);
        return expect(Burst.__super__.setProgress).toHaveBeenCalled();
      });
    });
  });

}).call(this);
