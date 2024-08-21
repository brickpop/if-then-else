import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { Else, ElseIf, If, Then } from '../src';

describe('If component', () => {
  describe('Single plain child', () => {
    it('Should render a plain child when true', () => {
      expect(renderToString(<If true={true}>should render</If>)).toEqual(
        'should render'
      );
    });
    it('Should not render a plain child when false', () => {
      expect(renderToString(<If true={false}>should not render</If>)).toEqual(
        ''
      );
    });
    it('Should render a plain child when not is false', () => {
      const actual = renderToString(<If not={false}>should render</If>);
      expect(actual).toEqual('should render');
    });
    it('Should render a plain child when not is true', () => {
      const actual = renderToString(<If not={true}>should not render</If>);
      expect(actual).toEqual('');
    });
  });

  describe('Single Then child', () => {
    it('Should render a Then child when condition is true', () => {
      const actual = renderToString(
        <If true={true}>
          <Then>should render</Then>
        </If>
      );
      expect(actual).toEqual('should render');
    });
    it('Should not render a Then child when condition is false', () => {
      const actual = renderToString(
        <If true={false}>
          <Then>should not render</Then>
        </If>
      );
      expect(actual).toEqual('');
    });
    it('Should render a Then child when not is false', () => {
      const actual = renderToString(
        <If not={false}>
          <Then>should render</Then>
        </If>
      );
      expect(actual).toEqual('should render');
    });
    it('Should not render a Then child when not is true', () => {
      const actual = renderToString(
        <If not={true}>
          <Then>should not render</Then>
        </If>
      );
      expect(actual).toEqual('');
    });
  });

  describe('Single ElseIf child', () => {
    it('Should not render a true ElseIf child when If true is true', () => {
      const actual = renderToString(
        <If true={true}>
          <ElseIf true={true}>should not render</ElseIf>
        </If>
      );
      expect(actual).toEqual('');
    });
    it('Should render a true ElseIf child when If true is false', () => {
      const actual = renderToString(
        <If true={false}>
          <ElseIf true={true}>should render</ElseIf>
        </If>
      );
      expect(actual).toEqual('should render');
    });
    it('Should not render a true ElseIf child when If not is false', () => {
      const actual = renderToString(
        <If not={false}>
          <ElseIf true={true}>should not render</ElseIf>
        </If>
      );
      expect(actual).toEqual('');
    });
    it('Should render a true ElseIf child when If not is true', () => {
      const actual = renderToString(
        <If not={true}>
          <ElseIf true={true}>should render</ElseIf>
        </If>
      );
      expect(actual).toEqual('should render');
    });
  });

  describe('Single Else child', () => {
    it('Should not render a Else child when condition is true', () => {
      const actual = renderToString(
        <If true={true}>
          <Else>should not render</Else>
        </If>
      );
      expect(actual).toEqual('');
    });
    it('Should render a Else child when condition is false', () => {
      const actual = renderToString(
        <If true={false}>
          <Else>should render</Else>
        </If>
      );
      expect(actual).toEqual('should render');
    });
    it('Should not render a Else child when not is false', () => {
      const actual = renderToString(
        <If not={false}>
          <Else>should not render</Else>
        </If>
      );
      expect(actual).toEqual('');
    });
    it('Should render a Else child when not is true', () => {
      const actual = renderToString(
        <If not={true}>
          <Else>should render</Else>
        </If>
      );
      expect(actual).toEqual('should render');
    });
  });

  describe('Children array', () => {
    describe('Extraneous children', () => {
      it('Should render pure non-conditional children', () => {
        let actual = renderToString(
          <If true={true}>
            <p>Hello</p>
            <p>World</p>
          </If>
        );
        expect(actual).toEqual('<p>Hello</p><p>World</p>');

        actual = renderToString(
          <If true={true}>
            <p>Hello</p>
            World
          </If>
        );
        expect(actual).toEqual('<p>Hello</p>World');

        actual = renderToString(
          <If true={true}>
            <ul>
              <li>Hello</li>
              <li>World</li>
            </ul>
            !
          </If>
        );
        expect(actual).toEqual('<ul><li>Hello</li><li>World</li></ul>!');
      });

      it('Should only render conditional nodes when one or more present', () => {
        // Then
        let actual = renderToString(
          <If true={true}>
            <Then>should render</Then>
            <ul>
              <li>Hello</li>
              <li>World</li>
              <li>!</li>
            </ul>
          </If>
        );
        expect(actual).toEqual('should render');

        // ElseIf
        actual = renderToString(
          <If true={false}>
            <ElseIf true={true}>should render</ElseIf>
            <ul>
              <li>Hello</li>
              <li>World</li>
              <li>!</li>
            </ul>
          </If>
        );
        expect(actual).toEqual('should render');

        // ElseIf
        actual = renderToString(
          <If true={false}>
            <ElseIf not={false}>should render</ElseIf>
            <ul>
              <li>Hello</li>
              <li>World</li>
              <li>!</li>
            </ul>
          </If>
        );
        expect(actual).toEqual('should render');

        // Else
        actual = renderToString(
          <If true={false}>
            <Else>should render</Else>
            <ul>
              <li>Hello</li>
              <li>World</li>
              <li>!</li>
            </ul>
          </If>
        );
        expect(actual).toEqual('should render');
      });
    });

    describe('Then', () => {
      it('Should render the first Then when true', () => {
        let actual = renderToString(
          <If true={true}>
            <Then>should render</Then>
            <Then>should not render</Then>
            <Then>should not render</Then>
          </If>
        );
        expect(actual).toEqual('should render');
      });

      it('Should render no Then when false', () => {
        const actual = renderToString(
          <If true={false}>
            <Then>should not render</Then>
            <Then>should not render</Then>
            <Then>should not render</Then>
          </If>
        );
        expect(actual).toEqual('');
      });

      it('Should render Then when true', () => {
        let actual = renderToString(
          <If true={true}>
            <Then>should render</Then>
            <ElseIf true={true}>should not render</ElseIf>
            <Else>should not render</Else>
          </If>
        );
        expect(actual).toEqual('should render');

        actual = renderToString(
          <If true={true}>
            <ElseIf true={true}>should not render</ElseIf>
            <Then>should render</Then>
            <Else>should not render</Else>
          </If>
        );
        expect(actual).toEqual('should render');

        actual = renderToString(
          <If true={true}>
            <Else>should not render</Else>
            <Then>should render</Then>
            <ElseIf true={true}>should not render</ElseIf>
          </If>
        );
        expect(actual).toEqual('should render');

        actual = renderToString(
          <If true={true}>
            <ElseIf true={true}>should not render</ElseIf>
            <Else>should not render</Else>
            <Then>should render</Then>
          </If>
        );
        expect(actual).toEqual('should render');
      });
    });

    describe('ElseIf true', () => {
      it('Should render the first true ElseIf when false', () => {
        let actual = renderToString(
          <If true={false}>
            <Then>should not render</Then>
            <ElseIf true={true}>should render</ElseIf>
            <Then>should not render</Then>
            <ElseIf true={true}>should not render</ElseIf>
            <Then>should not render</Then>
            <ElseIf true={true}>should not render</ElseIf>
          </If>
        );
        expect(actual).toEqual('should render');

        actual = renderToString(
          <If true={false}>
            <Then>should not render</Then>
            <ElseIf true={false}>should not render</ElseIf>
            <Then>should not render</Then>
            <ElseIf true={true}>should render</ElseIf>
            <Then>should not render</Then>
            <ElseIf true={true}>should not render</ElseIf>
          </If>
        );
        expect(actual).toEqual('should render');

        actual = renderToString(
          <If true={false}>
            <Then>should not render</Then>
            <ElseIf true={false}>should not render</ElseIf>
            <Then>should not render</Then>
            <ElseIf true={false}>should not render</ElseIf>
            <Then>should not render</Then>
            <ElseIf true={true}>should render</ElseIf>
          </If>
        );
        expect(actual).toEqual('should render');
      });

      it('Should render no ElseIf when true', () => {
        let actual = renderToString(
          <If true={true}>
            <ElseIf true={true}>should not render</ElseIf>
            <ElseIf true={true}>should not render</ElseIf>
            <ElseIf true={false}>should not render either</ElseIf>
          </If>
        );
        expect(actual).toEqual('');
      });
    });

    describe('ElseIf not', () => {
      it('Should render the first not false ElseIf when false', () => {
        let actual = renderToString(
          <If true={false}>
            <Then>should not render</Then>
            <ElseIf not={false}>should render</ElseIf>
            <Then>should not render</Then>
            <ElseIf not={false}>should not render</ElseIf>
            <Then>should not render</Then>
            <ElseIf not={false}>should not render</ElseIf>
          </If>
        );
        expect(actual).toEqual('should render');

        actual = renderToString(
          <If true={false}>
            <Then>should not render</Then>
            <ElseIf not={true}>should not render</ElseIf>
            <Then>should not render</Then>
            <ElseIf not={false}>should render</ElseIf>
            <Then>should not render</Then>
            <ElseIf not={false}>should not render</ElseIf>
          </If>
        );
        expect(actual).toEqual('should render');

        actual = renderToString(
          <If true={false}>
            <Then>should not render</Then>
            <ElseIf not={true}>should not render</ElseIf>
            <Then>should not render</Then>
            <ElseIf not={true}>should not render</ElseIf>
            <Then>should not render</Then>
            <ElseIf not={false}>should render</ElseIf>
          </If>
        );
        expect(actual).toEqual('should render');
      });

      it('Should render no ElseIf when true', () => {
        let actual = renderToString(
          <If true={true}>
            <ElseIf not={false}>should not render</ElseIf>
            <ElseIf not={false}>should not render</ElseIf>
            <ElseIf not={true}>should not render either</ElseIf>
          </If>
        );
        expect(actual).toEqual('');
      });
    });

    describe('Else', () => {
      it('Should render the first Else when false', () => {
        const actual = renderToString(
          <If true={false}>
            <Else>should render</Else>
            <Else>should not render</Else>
            <Else>should not render</Else>
          </If>
        );
        expect(actual).toEqual('should render');
      });

      it('Should render no Else when true', () => {
        let actual = renderToString(
          <If true={true}>
            <Else>should not render</Else>
            <Else>should not render</Else>
            <Else>should not render either</Else>
          </If>
        );
        expect(actual).toEqual('');
      });
    });

    describe('Priority', () => {
      it('Should render Then first when true', () => {
        const actual = renderToString(
          <If true={true}>
            <Else>should not render</Else>
            <ElseIf true={true}>should not render</ElseIf>
            <Then>should render</Then>
          </If>
        );
        expect(actual).toEqual('should render');
      });

      it('Should evaluate ElseIf before Else when ElseIf is true', () => {
        let actual = renderToString(
          <If true={false}>
            <Else>should not render</Else>
            <ElseIf true={false}>should not render</ElseIf>
            <ElseIf true={true}>should render</ElseIf>
            <Then>should not render</Then>
          </If>
        );
        expect(actual).toEqual('should render');

        actual = renderToString(
          <If true={false}>
            <Else>should not render</Else>
            <ElseIf true={true}>should render</ElseIf>
            <ElseIf true={false}>should not render</ElseIf>
            <Then>should not render</Then>
          </If>
        );
        expect(actual).toEqual('should render');
      });

      it('Should attempt to render Else last', () => {
        const actual = renderToString(
          <If true={false}>
            <Then>should not render</Then>
            <ElseIf true={false}>should not render</ElseIf>
            <Else>should render</Else>
          </If>
        );
        expect(actual).toEqual('should render');
      });

      it('Should not render anything when there are no matches', () => {
        const actual = renderToString(
          <If true={false}>
            <Then>should not render</Then>
            <ElseIf true={false}>should not render</ElseIf>
            <ElseIf true={false}>should not render</ElseIf>
            <ElseIf true={false}>should not render</ElseIf>
            <ElseIf true={false}>should not render</ElseIf>
          </If>
        );
        expect(actual).toEqual('');
      });

      it('Should render the first match', () => {
        let actual = renderToString(
          <If true={false}>
            <Then>should not render</Then>
            <ElseIf true={false}>should not render</ElseIf>
            <ElseIf true={false}>should not render</ElseIf>
            <ElseIf true={false}>should not render</ElseIf>
            <ElseIf true={false}>should not render</ElseIf>
            <Else>should render</Else>
          </If>
        );
        expect(actual).toEqual('should render');

        actual = renderToString(
          <If true={false}>
            <Then>should not render</Then>
            <ElseIf true={false}>should not render</ElseIf>
            <ElseIf true={false}>should not render</ElseIf>
            <ElseIf true={false}>should not render</ElseIf>
            <ElseIf true={true}>should render</ElseIf>
            <Else>should not render</Else>
          </If>
        );
        expect(actual).toEqual('should render');

        actual = renderToString(
          <If true={false}>
            <Then>should not render</Then>
            <ElseIf true={false}>should not render</ElseIf>
            <ElseIf true={false}>should not render</ElseIf>
            <ElseIf true={true}>should render</ElseIf>
            <ElseIf true={true}>should not render</ElseIf>
            <Else>should not render</Else>
          </If>
        );
        expect(actual).toEqual('should render');

        actual = renderToString(
          <If true={false}>
            <Then>should not render</Then>
            <ElseIf true={false}>should not render</ElseIf>
            <ElseIf true={true}>should render</ElseIf>
            <ElseIf true={true}>should not render</ElseIf>
            <ElseIf true={true}>should not render</ElseIf>
            <Else>should not render</Else>
          </If>
        );
        expect(actual).toEqual('should render');

        actual = renderToString(
          <If true={false}>
            <Then>should not render</Then>
            <ElseIf true={true}>should render</ElseIf>
            <ElseIf true={true}>should not render</ElseIf>
            <ElseIf true={true}>should not render</ElseIf>
            <ElseIf true={true}>should not render</ElseIf>
            <Else>should not render</Else>
          </If>
        );
        expect(actual).toEqual('should render');

        actual = renderToString(
          <If true={true}>
            <Then>should render</Then>
            <ElseIf true={true}>should not render</ElseIf>
            <ElseIf true={true}>should not render</ElseIf>
            <ElseIf true={true}>should not render</ElseIf>
            <ElseIf true={true}>should not render</ElseIf>
            <Else>should not render</Else>
          </If>
        );
        expect(actual).toEqual('should render');
      });
    });
  });

  describe('Array of conditions', () => {
    it('Should render only when all conditions are true', () => {
      // 3
      let actual = renderToString(<If all={[true, true, true]}>visible</If>);
      expect(actual).toEqual('visible');

      // 2
      actual = renderToString(<If all={[true, true, false]}>visible</If>);
      expect(actual).toEqual('');

      actual = renderToString(<If all={[true, false, true]}>visible</If>);
      expect(actual).toEqual('');

      actual = renderToString(<If all={[false, true, true]}>visible</If>);
      expect(actual).toEqual('');

      // 1
      actual = renderToString(<If all={[true, false, false]}>visible</If>);
      expect(actual).toEqual('');

      actual = renderToString(<If all={[false, true, false]}>visible</If>);
      expect(actual).toEqual('');

      actual = renderToString(<If all={[false, false, true]}>visible</If>);
      expect(actual).toEqual('');

      // 0
      actual = renderToString(<If all={[false, false, false]}>visible</If>);
      expect(actual).toEqual('');
    });

    it('Should render when all conditions are false', () => {
      // 3
      let actual = renderToString(<If none={[true, true, true]}>visible</If>);
      expect(actual).toEqual('');

      // 2
      actual = renderToString(<If none={[true, true, false]}>visible</If>);
      expect(actual).toEqual('');

      actual = renderToString(<If none={[true, false, true]}>visible</If>);
      expect(actual).toEqual('');

      actual = renderToString(<If none={[false, true, true]}>visible</If>);
      expect(actual).toEqual('');

      // 1
      actual = renderToString(<If none={[true, false, false]}>visible</If>);
      expect(actual).toEqual('');

      actual = renderToString(<If none={[false, true, false]}>visible</If>);
      expect(actual).toEqual('');

      actual = renderToString(<If none={[false, false, true]}>visible</If>);
      expect(actual).toEqual('');

      // 0
      actual = renderToString(<If none={[false, false, false]}>visible</If>);
      expect(actual).toEqual('visible');
    });

    it('Should render when some condition is true', () => {
      // 3
      let actual = renderToString(<If some={[true, true, true]}>visible</If>);
      expect(actual).toEqual('visible');

      // 2
      actual = renderToString(<If some={[true, true, false]}>visible</If>);
      expect(actual).toEqual('visible');

      actual = renderToString(<If some={[true, false, true]}>visible</If>);
      expect(actual).toEqual('visible');

      actual = renderToString(<If some={[false, true, true]}>visible</If>);
      expect(actual).toEqual('visible');

      // 1
      actual = renderToString(<If some={[true, false, false]}>visible</If>);
      expect(actual).toEqual('visible');

      actual = renderToString(<If some={[false, true, false]}>visible</If>);
      expect(actual).toEqual('visible');

      actual = renderToString(<If some={[false, false, true]}>visible</If>);
      expect(actual).toEqual('visible');

      // 0
      actual = renderToString(<If some={[false, false, false]}>visible</If>);
      expect(actual).toEqual('');
    });

    it('Should render when some condition is false', () => {
      // 3
      let actual = renderToString(
        <If notAll={[true, true, true]}>visible</If>
      );
      expect(actual).toEqual('');

      // 2
      actual = renderToString(<If notAll={[true, true, false]}>visible</If>);
      expect(actual).toEqual('visible');

      actual = renderToString(<If notAll={[true, false, true]}>visible</If>);
      expect(actual).toEqual('visible');

      actual = renderToString(<If notAll={[false, true, true]}>visible</If>);
      expect(actual).toEqual('visible');

      // 1
      actual = renderToString(
        <If notAll={[true, false, false]}>visible</If>
      );
      expect(actual).toEqual('visible');

      actual = renderToString(
        <If notAll={[false, true, false]}>visible</If>
      );
      expect(actual).toEqual('visible');

      actual = renderToString(
        <If notAll={[false, false, true]}>visible</If>
      );
      expect(actual).toEqual('visible');

      // 0
      actual = renderToString(
        <If notAll={[false, false, false]}>visible</If>
      );
      expect(actual).toEqual('visible');
    });
  });

  describe('Value comparison', () => {
    it('Should render only if the value and type are equal', () => {
      // Strict equality
      let actual = renderToString(
        <If val={1} is={1}>
          visible
        </If>
      );
      expect(actual).toEqual('visible');

      actual = renderToString(
        <If val={'1234'} is={'1234'}>
          visible
        </If>
      );
      expect(actual).toEqual('visible');

      actual = renderToString(
        <If val={false} is={false}>
          visible
        </If>
      );
      expect(actual).toEqual('visible');

      actual = renderToString(
        <If val={true} is={true}>
          visible
        </If>
      );
      expect(actual).toEqual('visible');

      // lose equality
      actual = renderToString(
        <If val={1} is={'1'}>
          visible
        </If>
      );
      expect(actual).toEqual('');

      actual = renderToString(
        <If val={'1'} is={1}>
          visible
        </If>
      );
      expect(actual).toEqual('');

      actual = renderToString(
        <If val={1} is={555}>
          visible
        </If>
      );
      expect(actual).toEqual('');

      // inequality
      actual = renderToString(
        <If val={1} is={'hello'}>
          visible
        </If>
      );
      expect(actual).toEqual('');

      actual = renderToString(
        <If val={1} is={true}>
          visible
        </If>
      );
      expect(actual).toEqual('');
    });

    it('Should render only if the value is not equal', () => {
      // Strict equality
      let actual = renderToString(
        <If val={1} isNot={1}>
          visible
        </If>
      );
      expect(actual).toEqual('');

      actual = renderToString(
        <If val={'1234'} isNot={'1234'}>
          visible
        </If>
      );
      expect(actual).toEqual('');

      actual = renderToString(
        <If val={false} isNot={false}>
          visible
        </If>
      );
      expect(actual).toEqual('');

      actual = renderToString(
        <If val={true} isNot={true}>
          visible
        </If>
      );
      expect(actual).toEqual('');

      // lose equality
      actual = renderToString(
        <If val={1} isNot={'1'}>
          visible
        </If>
      );
      expect(actual).toEqual('visible');

      actual = renderToString(
        <If val={'1'} isNot={1}>
          visible
        </If>
      );
      expect(actual).toEqual('visible');

      actual = renderToString(
        <If val={1} isNot={555}>
          visible
        </If>
      );
      expect(actual).toEqual('visible');

      // inequality
      actual = renderToString(
        <If val={1} isNot={'hello'}>
          visible
        </If>
      );
      expect(actual).toEqual('visible');

      actual = renderToString(
        <If val={1} isNot={true}>
          visible
        </If>
      );
      expect(actual).toEqual('visible');
    });

    it('Should render only if the value is below', () => {
      // equal
      let actual = renderToString(
        <If val={1} below={1}>
          visible
        </If>
      );
      expect(actual).toEqual('');

      actual = renderToString(
        <If val={555} below={555}>
          visible
        </If>
      );
      expect(actual).toEqual('');

      // below
      actual = renderToString(
        <If val={1} below={555}>
          visible
        </If>
      );
      expect(actual).toEqual('visible');

      actual = renderToString(
        <If val={50} below={1000}>
          visible
        </If>
      );
      expect(actual).toEqual('visible');

      // above
      actual = renderToString(
        <If val={555} below={1}>
          visible
        </If>
      );
      expect(actual).toEqual('');

      actual = renderToString(
        <If val={1000} below={50}>
          visible
        </If>
      );
      expect(actual).toEqual('');
    });

    it('Should render only if the value is above', () => {
      // equal
      let actual = renderToString(
        <If val={1} above={1}>
          visible
        </If>
      );
      expect(actual).toEqual('');

      actual = renderToString(
        <If val={555} above={555}>
          visible
        </If>
      );
      expect(actual).toEqual('');

      // below
      actual = renderToString(
        <If val={1} above={555}>
          visible
        </If>
      );
      expect(actual).toEqual('');

      actual = renderToString(
        <If val={50} above={1000}>
          visible
        </If>
      );
      expect(actual).toEqual('');

      // above
      actual = renderToString(
        <If val={555} above={1}>
          visible
        </If>
      );
      expect(actual).toEqual('visible');

      actual = renderToString(
        <If val={1000} above={50}>
          visible
        </If>
      );
      expect(actual).toEqual('visible');
    });

    it('Should render only if the value is lower or equal', () => {
      // equal
      let actual = renderToString(
        <If val={1} atMost={1}>
          visible
        </If>
      );
      expect(actual).toEqual('visible');

      actual = renderToString(
        <If val={555} atMost={555}>
          visible
        </If>
      );
      expect(actual).toEqual('visible');

      // below
      actual = renderToString(
        <If val={1} atMost={555}>
          visible
        </If>
      );
      expect(actual).toEqual('visible');

      actual = renderToString(
        <If val={50} atMost={1000}>
          visible
        </If>
      );
      expect(actual).toEqual('visible');

      // above
      actual = renderToString(
        <If val={555} atMost={1}>
          visible
        </If>
      );
      expect(actual).toEqual('');

      actual = renderToString(
        <If val={1000} atMost={50}>
          visible
        </If>
      );
      expect(actual).toEqual('');
    });

    it('Should render only if the value greater or equal', () => {
      // equal
      let actual = renderToString(
        <If val={1} atLeast={1}>
          visible
        </If>
      );
      expect(actual).toEqual('visible');

      actual = renderToString(
        <If val={555} atLeast={555}>
          visible
        </If>
      );
      expect(actual).toEqual('visible');

      // below
      actual = renderToString(
        <If val={1} atLeast={555}>
          visible
        </If>
      );
      expect(actual).toEqual('');

      actual = renderToString(
        <If val={50} atLeast={1000}>
          visible
        </If>
      );
      expect(actual).toEqual('');

      // above
      actual = renderToString(
        <If val={555} atLeast={1}>
          visible
        </If>
      );
      expect(actual).toEqual('visible');

      actual = renderToString(
        <If val={1000} atLeast={50}>
          visible
        </If>
      );
      expect(actual).toEqual('visible');
    });
  });

  describe('Array length comparison', () => {
    it('Should render only if the length equals', () => {
      // Equal
      let actual = renderToString(
        <If lengthOf={[1]} is={1}>
          visible
        </If>
      );
      expect(actual).toEqual('visible');

      actual = renderToString(
        <If lengthOf={[null, false, 'hi']} is={3}>
          visible
        </If>
      );
      expect(actual).toEqual('visible');

      // Not equal
      actual = renderToString(
        <If lengthOf={[1, false, 'hi']} is={1}>
          visible
        </If>
      );
      expect(actual).toEqual('');

      actual = renderToString(
        <If lengthOf={[]} is={1}>
          visible
        </If>
      );
      expect(actual).toEqual('');
    });

    it('Should render only if the length is not equal', () => {
      // Equal
      let actual = renderToString(
        <If lengthOf={[1]} isNot={1}>
          visible
        </If>
      );
      expect(actual).toEqual('');

      actual = renderToString(
        <If lengthOf={[null, false, 'hi']} isNot={3}>
          visible
        </If>
      );
      expect(actual).toEqual('');

      // Not equal
      actual = renderToString(
        <If lengthOf={[1, false, 'hi']} isNot={1}>
          visible
        </If>
      );
      expect(actual).toEqual('visible');

      actual = renderToString(
        <If lengthOf={[]} isNot={1}>
          visible
        </If>
      );
      expect(actual).toEqual('visible');
    });

    it('Should render only if the length is below', () => {
      // equal
      let actual = renderToString(
        <If lengthOf={['hi']} below={1}>
          visible
        </If>
      );
      expect(actual).toEqual('');

      actual = renderToString(
        <If lengthOf={['hi', 'hi', 'hi']} below={3}>
          visible
        </If>
      );
      expect(actual).toEqual('');

      // below
      actual = renderToString(
        <If lengthOf={['hi', 0]} below={3}>
          visible
        </If>
      );
      expect(actual).toEqual('visible');

      actual = renderToString(
        <If lengthOf={[]} below={3}>
          visible
        </If>
      );
      expect(actual).toEqual('visible');

      // above
      actual = renderToString(
        <If lengthOf={['hi', 10, false]} below={1}>
          visible
        </If>
      );
      expect(actual).toEqual('');

      actual = renderToString(
        <If lengthOf={['hi', 10, 'hi', 10]} below={3}>
          visible
        </If>
      );
      expect(actual).toEqual('');
    });

    it('Should render only if the length is above', () => {
      // equal
      let actual = renderToString(
        <If lengthOf={['hi']} above={1}>
          visible
        </If>
      );
      expect(actual).toEqual('');

      actual = renderToString(
        <If lengthOf={['hi', 'hi', 'hi']} above={3}>
          visible
        </If>
      );
      expect(actual).toEqual('');

      // below
      actual = renderToString(
        <If lengthOf={['hi', 0]} above={3}>
          visible
        </If>
      );
      expect(actual).toEqual('');

      actual = renderToString(
        <If lengthOf={[]} above={3}>
          visible
        </If>
      );
      expect(actual).toEqual('');

      // above
      actual = renderToString(
        <If lengthOf={['hi', 10, false]} above={1}>
          visible
        </If>
      );
      expect(actual).toEqual('visible');

      actual = renderToString(
        <If lengthOf={['hi', 10, 'hi', 10]} above={3}>
          visible
        </If>
      );
      expect(actual).toEqual('visible');
    });

    it('Should render only if the length is lower or equal', () => {
      // equal
      let actual = renderToString(
        <If lengthOf={['hi']} atMost={1}>
          visible
        </If>
      );
      expect(actual).toEqual('visible');

      actual = renderToString(
        <If lengthOf={['hi', 'hi', 'hi']} atMost={3}>
          visible
        </If>
      );
      expect(actual).toEqual('visible');

      // below
      actual = renderToString(
        <If lengthOf={['hi', 0]} atMost={3}>
          visible
        </If>
      );
      expect(actual).toEqual('visible');

      actual = renderToString(
        <If lengthOf={[]} atMost={3}>
          visible
        </If>
      );
      expect(actual).toEqual('visible');

      // above
      actual = renderToString(
        <If lengthOf={['hi', 10, false]} atMost={1}>
          visible
        </If>
      );
      expect(actual).toEqual('');

      actual = renderToString(
        <If lengthOf={['hi', 10, 'hi', 10]} atMost={3}>
          visible
        </If>
      );
      expect(actual).toEqual('');
    });

    it('Should render only if the length greater or equal', () => {
      // equal
      let actual = renderToString(
        <If lengthOf={['hi']} atLeast={1}>
          visible
        </If>
      );
      expect(actual).toEqual('visible');

      actual = renderToString(
        <If lengthOf={['hi', 'hi', 'hi']} atLeast={3}>
          visible
        </If>
      );
      expect(actual).toEqual('visible');

      // below
      actual = renderToString(
        <If lengthOf={['hi', 0]} atLeast={3}>
          visible
        </If>
      );
      expect(actual).toEqual('');

      actual = renderToString(
        <If lengthOf={[]} atLeast={3}>
          visible
        </If>
      );
      expect(actual).toEqual('');

      // above
      actual = renderToString(
        <If lengthOf={['hi', 10, false]} atLeast={1}>
          visible
        </If>
      );
      expect(actual).toEqual('visible');

      actual = renderToString(
        <If lengthOf={['hi', 10, 'hi', 10]} atLeast={3}>
          visible
        </If>
      );
      expect(actual).toEqual('visible');
    });
  });
});

describe('Then', () => {
  it('Should be transparent when placed outside of an If block', () => {
    const actual = renderToString(<Then>should render</Then>);
    expect(actual).toEqual('should render');
  });
});

describe('ElseIf', () => {
  it('Should be transparent when placed outside of an If block', () => {
    let actual = renderToString(<ElseIf true={true}>should render</ElseIf>);
    expect(actual).toEqual('should render');

    actual = renderToString(<ElseIf true={false}>should render</ElseIf>);
    expect(actual).toEqual('should render');
  });
});

describe('Else', () => {
  it('Should be transparent when placed outside of an If block', () => {
    const actual = renderToString(<Else>should render</Else>);
    expect(actual).toEqual('should render');
  });
});
