// should have a message when the component is rendered
/**
 * skenario testing
 *
 * - AlertMessage component
 *   - should have a message when the component is rendered
 */

/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, afterEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
import AlertMessage from './AlertMessage.tsx';

expect.extend(matchers);

describe('AlertMessage component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should have a message when the component is rendered', async () => {
    // Arrange
    const message = 'This is a success message';
    render(<AlertMessage message={message} />);
    // Action
    const alertSpan = await screen.findByText(message);

    // Assert
    expect(alertSpan).toBeInTheDocument();
    expect(alertSpan).toHaveTextContent(message);
    if (message) {
      expect(alertSpan).toBeVisible();
    }
  });
});
