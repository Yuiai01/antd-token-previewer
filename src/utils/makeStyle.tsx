import { ConfigProvider, theme as antdTheme } from '@madccc/antd';
import type React from 'react';
import type { CSSInterpolation } from '@ant-design/cssinjs';
import { useStyleRegister } from '@ant-design/cssinjs';
import type { GlobalToken } from '@madccc/antd/lib/theme/interface';
import { useContext } from 'react';

const { ConfigContext } = ConfigProvider;

const makeStyle =
  (
    path: string,
    styleFn: (token: GlobalToken & { rootCls: string }) => CSSInterpolation,
  ): (() => [(node: React.ReactNode) => React.ReactElement, string]) =>
  () => {
    const { theme, token, hashId } = antdTheme.useToken();
    const { getPrefixCls } = useContext(ConfigContext);
    const rootCls = getPrefixCls();

    return [
      useStyleRegister({ theme, hashId, token, path: [path] }, () =>
        styleFn({ ...token, rootCls: `.${rootCls}` }),
      ) as (node: React.ReactNode) => React.ReactElement,
      hashId,
    ];
  };

export default makeStyle;
