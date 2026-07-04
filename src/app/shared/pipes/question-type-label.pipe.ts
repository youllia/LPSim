import { Pipe, PipeTransform } from '@angular/core';
import { QuestionType } from '../models/question';

@Pipe({ name: 'questionTypeLabel' })
export class QuestionTypeLabelPipe implements PipeTransform {
  transform(type: QuestionType): string {
    switch (type) {
      case 'sc': return 'Single Choice';
      case 'mc': return 'Multiple Choice';
      case 'fi': return 'Fill-In';
    }
  }
}
