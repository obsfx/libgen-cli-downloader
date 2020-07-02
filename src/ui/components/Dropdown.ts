import {Interfaces} from '../interfaces.namespace';
import {Types} from '../types.namespace';

import EventHandler from '../modules/EventHandler';
import Terminal from '../modules/Terminal';
import Colors from '../modules/Colors';

import Listing from './Listing';

import keymap from '../keymap';

export default class Dropdown extends Listing {
    expanded: boolean;

    prefix: string;
    expandedprefix: string;

    constructor(params: Interfaces.ComponentParams) {
        super(params);

        this.expanded = false;

        this.prefix = '[+]';
        this.expandedprefix = Colors.get('yellow', '[-]');
    }

    public render(hover: boolean = false): void {
        Terminal.cursorXY(this.x, this.y);

        let output: string = hover ? 
            Colors.get(this.hovercolor, this.text) :
            Colors.get(this.color, this.text);

        process.stdout.write(output);

        this.renderPrefix();
    }

    private renderPrefix(): void {
        Terminal.cursorXY(this.x - (this.prefix.length + 1), this.y);

        let prefix: string = this.expanded ?
            this.expandedprefix :
            this.prefix;

        process.stdout.write(prefix)
    }

    public eventHandler(key: Types.stdinOnKeyParam): boolean {
        if (key.name == keymap.DOACTION) {
            if (this.sublist) {
                this.expanded = false;
                this.sublist.hide();
            }
        }

        return !this.expanded;
    }

    public show(): void {
        if (this.sublist) {
            this.expanded = true;

            this.sublist.setXY(this.x, this.y + 1);
            this.sublist.show();
        }
    }
}