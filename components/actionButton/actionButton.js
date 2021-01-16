import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import Button from '@material-ui/core/Button';

import styles from '../../styles/Button.module.scss';

const ActionButton = ({ content, path }) => {
  return (
    <Link href={path}>
      <a>
        <Button className={styles.actionButton}>{content}</Button>
      </a>
    </Link>
  );
};

export default ActionButton;
