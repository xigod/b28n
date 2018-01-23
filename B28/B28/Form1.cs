using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using System.Diagnostics;
using System.IO;

namespace B28
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void groupBox1_Enter_1(object sender, EventArgs e)
        {

        }

        private void openFileDialog1_FileOk(object sender, CancelEventArgs e)
        {

        }

        protected void button2_Click(object sender, EventArgs e)
        {
            //this.openFileDialog1.Filter = "jpg文件(*.jpg)|*.jpg|gif文件(*.gif)|*.gif";
            if (radioButton1.Checked || radioButton2.Checked)
            {
                if (this.folderBrowserDialog1.ShowDialog() == DialogResult.OK)
                {
                    string FileName = this.folderBrowserDialog1.SelectedPath;
                    // 你的 处理文件路径代码 
                    this.textBox1.Text = FileName;
                }
            }
            else
            {
                if (this.openFileDialog1.ShowDialog() == DialogResult.OK)
                {
                    string FileName = this.openFileDialog1.FileName;
                    // 你的 处理文件路径代码 
                    this.textBox1.Text = FileName;
                }
            }

        }

        protected void button1_Click(object sender, EventArgs e)
        {
            //this.openFileDialog1.Filter = "jpg文件(*.jpg)|*.jpg|gif文件(*.gif)|*.gif";
            if (radioButton2.Checked || radioButton3.Checked || radioButton4.Checked)
            {
                if (this.folderBrowserDialog1.ShowDialog() == DialogResult.OK)
                {
                    string FileName = this.folderBrowserDialog1.SelectedPath;
                    // 你的 处理文件路径代码 
                    this.textBox2.Text = FileName;
                    if (radioButton1.Checked)
                    {
                        this.textBox2.Text = FileName;
                    }
                }
            }
            else 
            {
                if (this.openFileDialog1.ShowDialog() == DialogResult.OK)
                {
                    string FileName = this.openFileDialog1.FileName;
                    // 你的 处理文件路径代码 
                    this.textBox2.Text = FileName;
                }
            }
            

        }

        protected void button3_Click(object sender, EventArgs e)
        {
            //this.openFileDialog1.Filter = "jpg文件(*.jpg)|*.jpg|gif文件(*.gif)|*.gif";

            if (this.openFileDialog1.ShowDialog() == DialogResult.OK)
            {
                string FileName = this.openFileDialog1.FileName;
                // 你的 处理文件路径代码 
                this.textBox3.Text = FileName;
            }

        }

        private void button4_Click(object sender, EventArgs e)
        {
            if (check())
            {
                RunCmdWithoutResult();
            }
        }

        public Boolean check()
        {

            if ((this.textBox1.Text == "" || this.textBox2.Text == "") || (radioButton2.Checked && this.textBox3.Text == "") || (radioButton3.Checked && (this.textBox4.Text == "" || this.textBox5.Text == "")))
            {
                MessageBox.Show("请将参数值补充完整！");
                return false;
            }

            return true;
        }

        public void RunCmdWithoutResult() //CMD命令
        {
            string str = Console.ReadLine();
            string src = this.textBox1.Text;
            string dest = this.textBox2.Text;
            string zh = "";
            string lang = this.textBox3.Text;
            string command = "";
            string key = this.textBox4.Text;
            string value = this.textBox5.Text;


            if (this.checkBox1.Checked)
            {
                zh = "-zh";
            }

            //获取命令
            if (radioButton1.Checked)
            {
                command = "node node_b28.js -src=\"" + src + "\" -dest=\"" + dest + "\" " + zh;
            }
            else if (radioButton2.Checked)
            {
                command = "node node_b28.js -src=\"" + src + "\" -dest=\"" + dest + "\" -lang=\"" + lang + "\" -t" + " -key=\"" + key + "\" -value=\"" + value;
            }
            else if (radioButton3.Checked)
            {
                command = "node EXCEL2JSON.js -f \"" + src + "\" -o \"" + dest + "\" -key " + key + " -value " + value;
            }
            else if (radioButton4.Checked)
            {
                command = "node JSON2EXCEL.js -f \"" + src + "\" -o \"" + dest + "\"";
            }

            System.Diagnostics.Process.Start("cmd.exe", "/k start /B " + command);
        }

        private void openFileDialog1_FileOk_1(object sender, CancelEventArgs e)
        {

        }

        private void textBox1_TextChanged(object sender, EventArgs e)
        {

        }

        private void label2_Click(object sender, EventArgs e)
        {

        }


    }
}
