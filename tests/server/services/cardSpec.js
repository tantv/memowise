/* global describe, xdescribe, it, xit, before, beforeEach, after, afterEach */

import { expect } from 'chai';
import {
  getNextCardToPlay,
} from '../../../src/server/services/card';

describe('Card Services', () => {
  describe('getNextCardToPlay', () => {
    it('should be a function', () => {
      expect(getNextCardToPlay).to.be.a('function');
    });

    // well, the method is essentially random. lame.
    // i need to rewrite this using SM-2 algorithm.
  });
});
