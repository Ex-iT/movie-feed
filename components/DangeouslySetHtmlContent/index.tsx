import React, { useEffect, useRef } from 'react';

const DangeouslySetHtmlContent = (props: {
  html: string;
  [key: string]: any;
}) => {
  const { html, ...rest } = props;
  const divRef = useRef(null);

  useEffect(() => {
    try {
      const contextualFragment = document
        .createRange()
        .createContextualFragment(html);

      if (divRef?.current) {
        (divRef.current as HTMLDivElement).innerHTML = '';
        (divRef.current as HTMLDivElement).appendChild(contextualFragment);
      }
    } catch (error) {
      console.error('Could not add unsafe HTML', error);
    }
  }, [html]);

  return <div {...rest} ref={divRef} />;
};

export default DangeouslySetHtmlContent;
