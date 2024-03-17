// should have a message when the component is rendered
/**
 * skenario testing
 *
 * - AlertMessage component
 *   - should have className params correct
 */

/**
 * @vitest-environment jsdom
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
import LoadingPage from './LoadingPage.tsx';

expect.extend(matchers);

describe('LoadingPage component', () => {
  it('should have a message when the component is rendered', async () => {
    // Arrange
    const className = 'loading-spinner';
    render(<LoadingPage loading={className} />);

    // Action
    const loadingSpan = await screen.findByTestId('loadingPage');

    // Assert
    expect(loadingSpan).toBeInTheDocument();
    expect(loadingSpan).toHaveClass(className);
    expect(loadingSpan).toBeVisible();
  });
});
