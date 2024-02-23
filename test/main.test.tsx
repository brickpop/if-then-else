import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { Else, ElseIf, If, Then } from '../src';

describe('If component', () => {
  describe('Single plain child', () => {
    it('Should render a plain child when condition is true', () => {
      const actual = renderToString(<If condition={true}>should render</If>);
      expect(actual).toEqual('should render');
    });
    it('Should not render a plain child when condition is false', () => {
      const actual = renderToString(
        <If condition={false}>should not render</If>
      );
      expect(actual).toEqual('');
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
        <If condition={true}>
          <Then>should render</Then>
        </If>
      );
      expect(actual).toEqual('should render');
    });
    it('Should not render a Then child when condition is false', () => {
      const actual = renderToString(
        <If condition={false}>
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
    it('Should not render a true ElseIf child when If condition is true', () => {
      const actual = renderToString(
        <If condition={true}>
          <ElseIf condition={true}>should not render</ElseIf>
        </If>
      );
      expect(actual).toEqual('');
    });
    it('Should render a true ElseIf child when If condition is false', () => {
      const actual = renderToString(
        <If condition={false}>
          <ElseIf condition={true}>should render</ElseIf>
        </If>
      );
      expect(actual).toEqual('should render');
    });
    it('Should not render a true ElseIf child when If not is false', () => {
      const actual = renderToString(
        <If not={false}>
          <ElseIf condition={true}>should not render</ElseIf>
        </If>
      );
      expect(actual).toEqual('');
    });
    it('Should render a true ElseIf child when If not is true', () => {
      const actual = renderToString(
        <If not={true}>
          <ElseIf condition={true}>should render</ElseIf>
        </If>
      );
      expect(actual).toEqual('should render');
    });
  });

  describe('Single Else child', () => {
    it('Should not render a Else child when condition is true', () => {
      const actual = renderToString(
        <If condition={true}>
          <Else>should not render</Else>
        </If>
      );
      expect(actual).toEqual('');
    });
    it('Should render a Else child when condition is false', () => {
      const actual = renderToString(
        <If condition={false}>
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
      it('Should ignore extraneous children', () => {
        let actual = renderToString(
          <If condition={true}>
            <p>Hello</p>
            <p>World</p>
          </If>
        );
        expect(actual).toEqual('');

        actual = renderToString(
          <If condition={true}>
            <p>Hello</p>
            World
          </If>
        );
        expect(actual).toEqual('');

        actual = renderToString(
          <If condition={true}>
            <ul>
              <li>Hello</li>
              <li>World</li>
            </ul>
            !
          </If>
        );
        expect(actual).toEqual('');
      });

      it('Should render only recognized logic nodes', () => {
        // Then
        let actual = renderToString(
          <If condition={true}>
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
          <If condition={false}>
            <ElseIf condition={true}>should render</ElseIf>
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
          <If condition={false}>
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
          <If condition={false}>
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
          <If condition={true}>
            <Then>should render</Then>
            <Then>should not render</Then>
            <Then>should not render</Then>
          </If>
        );
        expect(actual).toEqual('should render');
      });

      it('Should render no Then when false', () => {
        const actual = renderToString(
          <If condition={false}>
            <Then>should not render</Then>
            <Then>should not render</Then>
            <Then>should not render</Then>
          </If>
        );
        expect(actual).toEqual('');
      });

      it('Should render Then when true', () => {
        let actual = renderToString(
          <If condition={true}>
            <Then>should render</Then>
            <ElseIf condition={true}>should not render</ElseIf>
            <Else>should not render</Else>
          </If>
        );
        expect(actual).toEqual('should render');

        actual = renderToString(
          <If condition={true}>
            <ElseIf condition={true}>should not render</ElseIf>
            <Then>should render</Then>
            <Else>should not render</Else>
          </If>
        );
        expect(actual).toEqual('should render');

        actual = renderToString(
          <If condition={true}>
            <Else>should not render</Else>
            <Then>should render</Then>
            <ElseIf condition={true}>should not render</ElseIf>
          </If>
        );
        expect(actual).toEqual('should render');

        actual = renderToString(
          <If condition={true}>
            <ElseIf condition={true}>should not render</ElseIf>
            <Else>should not render</Else>
            <Then>should render</Then>
          </If>
        );
        expect(actual).toEqual('should render');
      });
    });

    describe('ElseIf condition', () => {
      it('Should render the first true ElseIf when false', () => {
        let actual = renderToString(
          <If condition={false}>
            <ElseIf condition={true}>should render</ElseIf>
            <ElseIf condition={true}>should not render</ElseIf>
            <ElseIf condition={true}>should not render</ElseIf>
          </If>
        );
        expect(actual).toEqual('should render');

        actual = renderToString(
          <If condition={false}>
            <ElseIf condition={false}>should not render</ElseIf>
            <ElseIf condition={true}>should render</ElseIf>
            <ElseIf condition={true}>should not render</ElseIf>
          </If>
        );
        expect(actual).toEqual('should render');

        actual = renderToString(
          <If condition={false}>
            <ElseIf condition={false}>should not render</ElseIf>
            <ElseIf condition={false}>should not render</ElseIf>
            <ElseIf condition={true}>should render</ElseIf>
          </If>
        );
        expect(actual).toEqual('should render');
      });

      it('Should render no ElseIf when true', () => {
        let actual = renderToString(
          <If condition={true}>
            <ElseIf condition={true}>should not render</ElseIf>
            <ElseIf condition={true}>should not render</ElseIf>
            <ElseIf condition={false}>should not render either</ElseIf>
          </If>
        );
        expect(actual).toEqual('');
      });
    });

    describe('ElseIf not', () => {
      it('Should render the first not false ElseIf when false', () => {
        let actual = renderToString(
          <If condition={false}>
            <ElseIf not={false}>should render</ElseIf>
            <ElseIf not={false}>should not render</ElseIf>
            <ElseIf not={false}>should not render</ElseIf>
          </If>
        );
        expect(actual).toEqual('should render');

        actual = renderToString(
          <If condition={false}>
            <ElseIf not={true}>should not render</ElseIf>
            <ElseIf not={false}>should render</ElseIf>
            <ElseIf not={false}>should not render</ElseIf>
          </If>
        );
        expect(actual).toEqual('should render');

        actual = renderToString(
          <If condition={false}>
            <ElseIf not={true}>should not render</ElseIf>
            <ElseIf not={true}>should not render</ElseIf>
            <ElseIf not={false}>should render</ElseIf>
          </If>
        );
        expect(actual).toEqual('should render');
      });

      it('Should render no ElseIf when true', () => {
        let actual = renderToString(
          <If condition={true}>
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
          <If condition={false}>
            <Else>should render</Else>
            <Else>should not render</Else>
            <Else>should not render</Else>
          </If>
        );
        expect(actual).toEqual('should render');
      });

      it('Should render no Else when true', () => {
        let actual = renderToString(
          <If condition={true}>
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
          <If condition={true}>
            <Then>should render</Then>
            <ElseIf condition={true}>should not render</ElseIf>
            <Else>should not render</Else>
          </If>
        );
        expect(actual).toEqual('should render');
      });

      it('Should evaluate ElseIf before Else when ElseIf is true', () => {
        let actual = renderToString(
          <If condition={false}>
            <Then>should not render</Then>
            <ElseIf condition={true}>should render</ElseIf>
            <ElseIf condition={false}>should not render</ElseIf>
            <Else>should not render</Else>
          </If>
        );
        expect(actual).toEqual('should render');

        actual = renderToString(
          <If condition={false}>
            <Then>should not render</Then>
            <ElseIf condition={false}>should not render</ElseIf>
            <ElseIf condition={true}>should render</ElseIf>
            <Else>should not render</Else>
          </If>
        );
        expect(actual).toEqual('should render');
      });

      it('Should attempt to render Else last', () => {
        const actual = renderToString(
          <If condition={false}>
            <Then>should not render</Then>
            <ElseIf condition={false}>should not render</ElseIf>
            <Else>should render</Else>
          </If>
        );
        expect(actual).toEqual('should render');
      });

      it('Should not render anything when there are no matches', () => {
        const actual = renderToString(
          <If condition={false}>
            <Then>should not render</Then>
            <ElseIf condition={false}>should not render</ElseIf>
            <ElseIf condition={false}>should not render</ElseIf>
            <ElseIf condition={false}>should not render</ElseIf>
            <ElseIf condition={false}>should not render</ElseIf>
          </If>
        );
        expect(actual).toEqual('');
      });

      it('Should render the first match', () => {
        let actual = renderToString(
          <If condition={false}>
            <Then>should not render</Then>
            <ElseIf condition={false}>should not render</ElseIf>
            <ElseIf condition={false}>should not render</ElseIf>
            <ElseIf condition={false}>should not render</ElseIf>
            <ElseIf condition={false}>should not render</ElseIf>
            <Else>should render</Else>
          </If>
        );
        expect(actual).toEqual('should render');

        actual = renderToString(
          <If condition={false}>
            <Then>should not render</Then>
            <ElseIf condition={false}>should not render</ElseIf>
            <ElseIf condition={false}>should not render</ElseIf>
            <ElseIf condition={false}>should not render</ElseIf>
            <ElseIf condition={true}>should render</ElseIf>
            <Else>should not render</Else>
          </If>
        );
        expect(actual).toEqual('should render');

        actual = renderToString(
          <If condition={false}>
            <Then>should not render</Then>
            <ElseIf condition={false}>should not render</ElseIf>
            <ElseIf condition={false}>should not render</ElseIf>
            <ElseIf condition={true}>should render</ElseIf>
            <ElseIf condition={true}>should not render</ElseIf>
            <Else>should not render</Else>
          </If>
        );
        expect(actual).toEqual('should render');

        actual = renderToString(
          <If condition={false}>
            <Then>should not render</Then>
            <ElseIf condition={false}>should not render</ElseIf>
            <ElseIf condition={true}>should render</ElseIf>
            <ElseIf condition={true}>should not render</ElseIf>
            <ElseIf condition={true}>should not render</ElseIf>
            <Else>should not render</Else>
          </If>
        );
        expect(actual).toEqual('should render');

        actual = renderToString(
          <If condition={false}>
            <Then>should not render</Then>
            <ElseIf condition={true}>should render</ElseIf>
            <ElseIf condition={true}>should not render</ElseIf>
            <ElseIf condition={true}>should not render</ElseIf>
            <ElseIf condition={true}>should not render</ElseIf>
            <Else>should not render</Else>
          </If>
        );
        expect(actual).toEqual('should render');

        actual = renderToString(
          <If condition={true}>
            <Then>should render</Then>
            <ElseIf condition={true}>should not render</ElseIf>
            <ElseIf condition={true}>should not render</ElseIf>
            <ElseIf condition={true}>should not render</ElseIf>
            <ElseIf condition={true}>should not render</ElseIf>
            <Else>should not render</Else>
          </If>
        );
        expect(actual).toEqual('should render');
      });
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
    let actual = renderToString(
      <ElseIf condition={true}>should render</ElseIf>
    );
    expect(actual).toEqual('should render');

    actual = renderToString(<ElseIf condition={false}>should render</ElseIf>);
    expect(actual).toEqual('should render');
  });
});

describe('Else', () => {
  it('Should be transparent when placed outside of an If block', () => {
    const actual = renderToString(<Else>should render</Else>);
    expect(actual).toEqual('should render');
  });
});
